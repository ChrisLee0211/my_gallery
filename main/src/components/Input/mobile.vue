<template>
    <input 
        class="rounded focus:ring-2 focus:ring-indigo-300 shadow-md w-80 h-9 px-4 box-border" 
        v-model="value"
        :placeholder="label"
        />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:"InputMpbile",
    props:{
        value:{
            type:String,
            default:''
        },
        label:{
            type:String,
            default:''
        }
    },
    setup(props,ctx) {
        
    },
})
</script>
