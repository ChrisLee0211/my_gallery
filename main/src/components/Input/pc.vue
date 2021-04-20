<template>
    <div 
        :class="`relative rounded`" 
        @click="handleFocus"
        @mouseenter="enter"
        @mouseleave="leave"
        >
        <div :class="`transition-all absolute top-1/2 transform -translate-y-1/2 ${prefixClass}`">
            <slot name="prefix" />
        </div>
        <input 
            ref="inputRef"
            :class="`rounded pl-2 ${inputClass} focus:outline-none focus:ring focus:border-blue-300`"
            style="outline:none"
            v-model="value"
            @focus="onFocus"
            @blur="onBlur"
            @input="onChange"
            :type="type"
            />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, ComputedRef } from 'vue'
import {sizeMap} from '../constant'

// interface propsType {
//     value:string,
//     size: 'large' | 'medium' | 'small',
//     type: 'text' | 'number' | 'email' | 'password'
// }

// interface setupType {
//     onFocus:(e:FocusEvent)=>void
//     onBlur:(e:FocusEvent)=>void
//     onChange:(e:Event)=>void
//     handleFocus:()=>void
//     enter:()=>void
//     leave:()=>void
//     inputClass:ComputedRef<string>
//     prefixClass:ComputedRef<string>
// }

export default defineComponent({
    name:'InputPc',
    props:{
        value:{
            type:String,
            default:''
        },
        size:{
            type:String,
            default:'large',
        },
        type:{
            type:String,
            default:'text'
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
            ctx.emit('onChange', event)
        }
        const handleFocus = () => {
            try{
                inputRef.value?.focus();
                isFocus.value = true
            }catch(e){
                console.error(e)
            }
        }
        const enter = () => {
            isFocus.value = true;
        }
        const leave = () => {
            isFocus.value = props.value.length > 0
        }
        return {
            onFocus, 
            onBlur, 
            onChange,
            handleFocus,
            enter,
            leave,
            inputRef, 
            inputClass,
            prefixClass,
        }
    },
})
</script>
