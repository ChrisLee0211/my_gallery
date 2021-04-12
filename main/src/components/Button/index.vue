<template>
    <div :class="`cursor-pointer transition-all text-white flex items-center justify-center ${color} ${baseClass}`">
        <div v-if="!loading">
            <slot />
        </div>
        <div class="animate-spin" v-else>
            <loading-icon :width="'30'" :height="'30'" :color="'white'" />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import LoadingIcon from '../Icon/Loading.vue';
import {sizeMap} from '../constant'

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
            default:'bg-indigo-700'
        },
        size:{
            type:String,
            default: 'medium'
        }
    },
    setup(props,ctx) {
        const baseClass = computed(() => {
            const paddingMap = sizeMap.padding;
            const padding = sizeMap.padding[(props.size as keyof typeof paddingMap)]
            const base = `${padding} rounded`
            const active = `p-${padding.split('py-')[1].split('px')} rounded-full`;
            return props.loading ? active : base
        });

        return {baseClass}
    },
})
</script>
