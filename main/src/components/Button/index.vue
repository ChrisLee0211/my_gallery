<template>
    <div :class="`cursor-pointer flex items-center justify-center ${color} ${baseClass} ${loadingClass}`">
        <div v-if="!loading">
            <slot />
        </div>
        <div class="animate-spin" v-else>
            <loading-icon :width="'30'" :height="'30'" />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import LoadingIcon from '../Icon/Loading.vue';

export default defineComponent({
    name: 'clButton',
    components: {
        'loading-icon':LoadingIcon
    },
    props:{
        loading:{
            type:Boolean,
            default:false
        },
        color:{
            type:String,
            default:'bg-indigo-500'
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
        const loadingClass = computed(() => {
            return props.loading ? 'rounded-full'  : 'rounded'
        });

        return {baseClass, loadingClass}
    },
})
</script>
