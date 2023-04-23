type TaskFn<T=any,K=any> = (data:T)=>K
export default class WorkerCreator {
    baseConfig:string = '';
    worker:Worker|undefined;
    flagMap:{[id:number]:{rs:Function,rj:Function,ctx:string}} = {};
    /**
     * 实例化一个worker构造器
     * @param baseConfig 基本预设变量，{key:value}形式，配置后可以在run中任务使用，两者在同一作用域
     */
    constructor(baseConfig?:{[str:string]:any}){
        try{
            this.baseConfig = baseConfig? this.createGlobalConfig(baseConfig) : '';
        }catch(e){
            console.error(e)
        }
    };
    /**
     * 格式化task函数
     * @param fn 将传入的函数进行字符串化
     * @returns 
     */
    private formatTask(fn:Function):string{
        const fnStr = `const formatFn = ${fn.toString()};`;
        return fnStr
    }

    /**
     * 创建worker运行的预设变量，并且输出为字符串
     * @param obj 预设变量对象
     * @returns 
     */
    private createGlobalConfig(obj:{[str:string]:any}):string {
        const strArray:string[] = [];
        const keys = Object.keys(obj);
        for(let i=0;i<keys.length;i++){
            const curKey = keys[i];
            const val = obj[curKey];
            const str = `const ${curKey} = ${val};`;
            strArray.push(str)
        }
        return strArray.join('\n')
    }

    /**
     * 创建worker主体内容
     * @returns 
     */
    private createWorkerContent():string{
        return `
            self.onmessage = (event) => {
                const {data} = event;
                const {msg,flag} = data
                self.postMessage({
                    data: formatFn(msg),
                    flag
                })
            }
        `
    }

    /**
     * 将worker执行结果resolve出去，并销毁对应的resolve函数释放内存
     * @param recieveInfo 
     */
    private handleResult(recieveInfo:MessageEvent<{data:any,flag:number}>){
        const {data} = recieveInfo;
        const {data:result, flag} = data
        const targetInfo = this.flagMap[flag];
        const {rs:resolve,rj:reject,ctx} = targetInfo;
        try{
            if(resolve){
                resolve(result);
                delete this.flagMap[flag]
                URL.revokeObjectURL(ctx)
            }
        }catch(e){
            if(reject){
                reject(e);
                delete this.flagMap[flag];
                URL.revokeObjectURL(ctx);
            }
        }
    }

    /**
     * 在worker中执行任务
     * @param fn 要在worker中执行的task函数
     * @param args 传入给task的参数，为{key:value}形式
     * @returns 
     */
    run<T=any,K=any>(fn:TaskFn<T,K>,args:{[key:string]:any}){
        const blob = new Blob([`(() => {${this.baseConfig}${this.formatTask(fn)}${this.createWorkerContent()}})()`]);
        const ctx = URL.createObjectURL(blob)
        this.worker = new Worker(ctx);
        this.worker.addEventListener('message', this.handleResult.bind(this));
        const flag = Number(new Date()) + Math.floor(Math.random()*100);
        this.worker.postMessage({
            msg:args,
            flag
        });
        return new Promise<K>((rs,rj) => {
            this.flagMap[flag] = {
                rs,rj,ctx
            }
        })
    }

    /**
     * 关闭worker释放内存
     */
    close(){
        this.worker?.terminate();
    }
}