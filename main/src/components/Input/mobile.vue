<template>
    <input 
        class="rounded focus:ring-blue-500 shadow-md w-80 h-9 px-4 box-border" 
        v-model="value"
        :placeholder="placeholder"
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
        placeholder:{
            type:String,
            default:''
        },
        size:{
            type:String,
            default:'small'
        }
    },
    setup(props,ctx) {
        
    },
})
</script>
