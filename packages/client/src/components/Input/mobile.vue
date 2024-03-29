<template>
    <div :class="`rounded relative ${inputClass} `" @touchstart="handleFocus">
        <div :class="`transition-all absolute top-1/2 z-10 transform -translate-y-1/2 ${prefixClass}`">
            <slot name="prefix" />
        </div>
        <input 
            ref="inputRef"
            :class="`absolute inset-0 w-full z-0 rounded pl-2 focus:outline-none focus:ring focus:border-blue-300`"
            style="outline:none"
            :value="value"
            :type="type"
            @focus="onFocus"
            @blur="onBlur"
            @input="onChange"
            />
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted, ComputedRef, watchEffect } from 'vue'
import {sizeMap} from '../constant'

interface propsType {
    value:string,
    size: 'large' | 'medium' | 'small',
    type: 'text' | 'number' | 'email' | 'password'
}

interface setupType {
    onFocus:(e:FocusEvent)=>void
    onBlur:(e:FocusEvent)=>void
    onChange:(e:Event)=>void
    handleFocus:()=>void
    inputClass:ComputedRef<string>
    prefixClass:ComputedRef<string>
}

export default defineComponent({
    name:"InputMobile",
    props:{
        size:{
            type:String,
            default:'large',
        },
        type:{
            type:String,
            default:'text'
        },
        value:{
            type:String,
            default:''
        }
    },
    setup(props,ctx) {
        const inputRef = ref<HTMLInputElement>()
        const isFocus = ref(false);    
        onMounted(() => {
            if( props.value && props.value.length > 0){
                isFocus.value = true
            }
        })
        const inputClass = computed(() => {
            const inputSizeMap = sizeMap.input;
            return sizeMap.input[(props.size as keyof typeof inputSizeMap)]
        })
        const prefixClass = computed(() => {
            return isFocus.value ? '-left-10' : 'left-4'
        })
        const onFocus = (event:FocusEvent) => {
            isFocus.value = true;
            ctx.emit('onFoucs',event)
        };
        const onBlur = (event:FocusEvent) => {
            isFocus.value = props.value.length > 0
            ctx.emit('onBlur',event)
        }
        const onChange = (event:Event) => {
            ctx.emit('onChange', event);
            const inputEle = event.target as HTMLInputElement
            ctx.emit('update:value',inputEle.value)
        }
        const handleFocus = () => {
            try{
                inputRef.value?.focus();
                isFocus.value = true
            }catch(e){
                console.error(e)
            }
        }
        return {
            onFocus, 
            onBlur, 
            onChange,
            handleFocus,
            inputRef, 
            inputClass,
            prefixClass,
        }
    },
})
</script>
