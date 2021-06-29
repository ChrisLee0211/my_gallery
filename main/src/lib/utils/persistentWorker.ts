/* eslint-disable @typescript-eslint/ban-types */

type TaskFn<T=any, K=any> = (data:T)=>K

/**
 * 使用Blob引用构建运行时web worker(持久化版)
 * @author chris lee
 * @Time 2021/06/19
 */
export default class PersistentWorkerCreator {
  baseConfig = '';

  baseFuntion = {};

  ctx = '';

  worker:Worker|undefined;

  flagMap:{[id:number]:{rs:Function, rj:Function}} = {};

  /**
     * 实例化一个worker构造器
     * @param baseConfig 基本预设变量，{key:value}形式，配置后可以在run中任务使用，两者在同一作用域
     */
  constructor(baseConfig?:{[str:string]:any}, baseFuntion?:{[str:string]: Function}) {
    try {
      this.baseConfig = baseConfig ? this.createGlobalConfig(baseConfig) : '';
      this.baseFuntion = baseFuntion ? this.createGlobalFuntion(baseFuntion) : '';
      const blob = new Blob([`(() => {\n${this.baseConfig}\n${this.baseFuntion}\n${this.createWorkerContent()}})()`]);
      this.ctx = URL.createObjectURL(blob);
      this.worker = new Worker(this.ctx);
      this.worker.addEventListener('message', this.handleResult.bind(this));
      this.run.bind(this);
    } catch (e) {
      console.error(e);
    }
    return this;
  }

  /**
   * 对全局变量参数进行格式化，根据不同类型进行转化得到字符串
   * @param target 目前支持Object、 Array、String、 Number、Boolean类型
   * @returns {string}
   * @author chris lee
   * @Time 2021/06/24
   */
  private transObjectToString(target:unknown):string {
    let result = '';
    if (Object.prototype.toString.call(target) === '[object Object]') {
      const obj = target as {[key:string]:any};
      const keys = Object.keys(obj);
      let startStr = '{';
      const endStr = '}';
      for (let i = 0; i < keys.length; i++) {
        const curKey = keys[i];
        const val = this.transObjectToString(obj[curKey]);
        startStr += `${curKey}:${val},`;
      }
      result = `${startStr}${endStr}`;
    }
    if (Object.prototype.toString.call(target) === '[object Array]') {
      const arr = target as any[];
      const len = arr.length;
      let startStr = '[';
      const endStr = ']';
      for (let i = 0; i < len; i++) {
        const curVal = this.transObjectToString(arr[i]);
        if (i !== len - 1) {
          startStr += `${curVal},`;
        } else {
          startStr += `${curVal}`;
        }
      }
      result = `${startStr}${endStr}`;
    }
    if (Object.prototype.toString.call(target) === '[object String]') {
      result = target as string;
    }
    if (Object.prototype.toString.call(target) === '[object Boolean]') {
      result = String(target as boolean);
    }
    if (Object.prototype.toString.call(target) === '[object Number]') {
      result = String(target as number);
    }
    return result;
  }

  /**
     * 创建worker运行的预设变量，并且输出为字符串
     * @param obj 预设变量对象
     * @returns
     */
  private createGlobalConfig(obj:{[str:string]:any}):string {
    const strArray:string[] = [];
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const curKey = keys[i];
      const val = this.transObjectToString(obj[curKey]);
      const str = `const ${curKey} = ${val};`;
      strArray.push(str);
    }
    return strArray.join('\n');
  }

  /**
   * 创建worker运行时的预设函数，并输出为字符串，必须为纯函数或者只能使用预设变量
   * @param fnMap 预设函数集合
   * @returns {string}
   * @author chris lee
   * @Time 2021/06/24
   */
  private createGlobalFuntion(fnMap:{[str:string]: Function}) {
    const fnName = Object.keys(fnMap);
    let startStr = 'const functionMap = {\n';
    const endStr = '};';
    for (let i = 0; i < fnName.length; i++) {
      const currentFnName = fnName[i];
      const fnbody = fnMap[currentFnName].toString();
      startStr += `${currentFnName}:${fnbody}`;
      if (i !== fnName.length) {
        startStr += ',\n';
      }
    }
    return `${startStr}${endStr}`;
  }

  /**
     * 创建worker主体内容
     * @returns
     */
  private createWorkerContent():string {
    return `
            self.onmessage = (event) => {
                const {data} = event;
                const {msg,flag,fnName} = data
                self.postMessage({
                    data: functionMap[fnName](msg),
                    flag
                })
            }
        `;
  }

  /**
     * 将worker执行结果resolve出去，并销毁对应的resolve函数释放内存
     * @param recieveInfo
     */
  private handleResult(recieveInfo:MessageEvent<{data:any, flag:number}>) {
    const { data } = recieveInfo;
    const { data: result, flag } = data;
    const targetInfo = this.flagMap[flag];
    const { rs: resolve, rj: reject } = targetInfo;
    try {
      if (resolve) {
        resolve(result);
        delete this.flagMap[flag];
      }
    } catch (e) {
      if (reject) {
        reject(e);
        delete this.flagMap[flag];
      }
    }
  }

  /**
     * 在worker中执行任务
     * @param fn 要在worker中预设的函数名称
     * @param args 传入给task的参数，为{key:value}形式
     * @returns
     */
  run<K=any>(fnName:string, args:{[key:string]:any}):Promise<K> {
    if (this.worker === undefined) throw new Error('Worker init failed');
    const flag = Number(new Date()) + Math.floor(Math.random() * 100);
    this.worker.postMessage({
      msg: args,
      flag,
      fnName,
    });
    return new Promise<K>((rs, rj) => {
      this.flagMap[flag] = {
        rs, rj,
      };
    });
  }

  /**
     * 关闭worker释放内存
     */
  close() {
    if (this.worker) {
      URL.revokeObjectURL(this.ctx);
      this.worker.terminate();
    }
  }
}
