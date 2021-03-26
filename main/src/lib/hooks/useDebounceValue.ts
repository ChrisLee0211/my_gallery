import {ref,Ref, UnwrapRef, computed} from "vue";
import {debounce} from "../utils/index"

export const useDebounceValue:<T>(initVal:T,delay:number)=>Ref<UnwrapRef<T>> = (initVal,delay=300)=>{

    const reactValue = ref(initVal);
    const debounceVal = computed({
        get:()=>reactValue.value,
        set:debounce((val:any)=>{
            reactValue.value = val
        },delay)
    })
    
    return debounceVal
}