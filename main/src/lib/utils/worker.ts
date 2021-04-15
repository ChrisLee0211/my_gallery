

export default class WorkerCreator {
    baseConfig:string = '';
    worker:Worker|undefined;
    flagMap:{[id:number]:Function} = {};
    constructor(baseConfig?:{[str:string]:any}){
        try{
            this.baseConfig = baseConfig? this.createGlobalConfig(baseConfig) : '';
        }catch(e){
            console.error(e)
        }
    };

    formatTask(fn:Function):string{
        const fnStr = `const formatFn = ${fn.toString()};`;
        return fnStr
    }

    createGlobalConfig(obj:{[str:string]:any}):string {
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

    createWorkerContent():string{
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

    handleResult(recieveInfo:MessageEvent<{data:any,flag:number}>){
        const {data} = recieveInfo;
        const {data:result, flag} = data
        const resolve = this.flagMap[flag];
            if(resolve){
                resolve(result);
                delete this.flagMap[flag]
            }
    }

    run<T=any>(fn:Function,args:{[key:string]:any}){
        const blob = new Blob([`(() => {${this.baseConfig}${this.formatTask(fn)}${this.createWorkerContent()}})()`]);
        const ctx = URL.createObjectURL(blob)
        this.worker = new Worker(ctx);
        this.worker.addEventListener('message', this.handleResult.bind(this));
        const flag = Number(new Date()) + Math.floor(Math.random()*100);
        this.worker.postMessage({
            msg:args,
            flag
        });
        return new Promise<T>((res,rej) => {
            this.flagMap[flag] = res
        })
    }

    close(){
        this.worker?.terminate();
    }
}