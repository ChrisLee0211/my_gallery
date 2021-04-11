<template>
    <div :class="`rounded cursor-pointer ${baseClass}`">
        <div v-if="!loading">
            <slot />
        </div>
        <div v-else>
            loading~
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'clButton',
    props:{
        loading:{
            type:Boolean,
            default:false
        },
        color:{
            type:String,
            default:''
        },
        size:{
            type:String,
            default: 'medium'
        }
    },
    setup(props,ctx) {
        const baseClass = computed(() => {
            return ''
        });

        return {baseClass}
    },
})
</script>
