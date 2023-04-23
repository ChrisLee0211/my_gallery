export const debounce = (Fn:Function,delay:number=300) => {
    let timer:NodeJS.Timeout;
    return function(this:any,...args:Array<any>){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            Fn.apply(this,args)
        },delay)
    }
}