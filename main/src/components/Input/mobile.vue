<template>
    <div :class="`relative rounded ${focusClass}`">
        <div class="absolute z-10">
            <slot name="prefix" />
        </div>
        <input 
            ref="inputRef"
            :class="`rounded z-0 ${inputClass}`"
            style="outline:none"
            v-model="value"
            v-bind="$attrs"
            @focus="onFocus"
            @blur="onBlur"
            @change="onChange"
            />
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import {sizeMap} from '../constant'

export default defineComponent({
    name:"InputMpbile",
    props:{
        value:{
            type:String,
            default:''
        },
        size:{
            type:String,
            default:'large'
        }
    },
    setup(props,ctx) {
        const inputRef = ref<HTMLInputElement>()
        const focusClass = ref('')
        onMounted(() => {

        })
        const inputClass = computed(() => {
            const inputSizeMap = sizeMap.input;
            return sizeMap.input[(props.size as keyof typeof inputSizeMap)]
        })
        const onFocus = (event:FocusEvent) => {
            ctx.emit('onFoucs',event)
        };
        const onBlur = (event:FocusEvent) => {
            ctx.emit('onBlur',event)
        }
        const onChange = (event:Event) => {
            ctx.emit('onChange', event)
        }
        return {onFocus, onBlur, onChange, focusClass, inputRef, inputClass}
    },
})
</script>
