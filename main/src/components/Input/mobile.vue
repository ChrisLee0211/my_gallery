<template>
    <div :class="`relative rounded`" @touchstart="handleFocus">
        <div :class="`transition-all absolute top-1/2 transform -translate-y-1/2 ${prefixClass}`">
            <slot name="prefix" />
        </div>
        <input 
            ref="inputRef"
            :class="`rounded pl-2 ${inputClass} focus:outline-none focus:ring focus:border-blue-300`"
            style="outline:none"
            v-model="inputVal"
            :type="type"
            @focus="onFocus"
            @blur="onBlur"
            @input="onChange"
            />
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import {sizeMap} from '../constant'

export default defineComponent({
    name:"InputMobile",
    props:{
        initValue:{
            type:String,
            default:''
        },
        size:{
            type:String,
            default:'large'
        },
        //text | number | email | password
        type: {
            type:String,
            default:'text',
        }
    },
    setup(props,ctx) {
        const inputRef = ref<HTMLInputElement>()
        const isFocus = ref(false);    
        const inputVal = ref('');
        onMounted(() => {
            if(props.initValue.length > 0){
                isFocus.value = true
                inputVal.value = props.initValue;
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
            isFocus.value = inputVal.value.length > 0
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
        return {
            onFocus, 
            onBlur, 
            onChange,
            handleFocus,
            inputRef, 
            inputClass,
            prefixClass,
            inputVal
        }
    },
})
</script>
