<template>
    <svg :class="customClass" :width="`${size}`" :height="`${size}`">
        <use v-if="name" :xlink:href="`#icon${name}`" />
    </svg>
</template>
<script lang="ts">
export default {
    name:'svg-icon',
    props:{
        name:{
            type:String,
            default:undefined
        },
        customClass:{
            type:String,
            default:"svg-icon"
        },
        size:{
            type:Number,
            default:20
        }
    },
}
</script>