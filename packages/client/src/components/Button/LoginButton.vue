<template>
    <div :class="`relative flex items-center justify-center box-content p-2 ${activeClass}`" @touchstart="onTouchStart">
        <div
            :class="`${paddingSize} rounded flex items-center justify-center bg-indigo-700 shadow-md text-white ${toggleClass}`"
        >
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { sizeMap } from '../constant';

export default defineComponent({
    name: 'login-button',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: undefined
        },
        height: {
            type: String,
            default: undefined,
        },
        size: {
            type: String,
            default: 'medium'
        }
    },
    setup(props, ctx) {
        const activeClass = computed(() => {
            if (props.loading) return 'login-btn-active'
            return ''
        });
        const paddingSize = computed(() => {
            if(props.width || props.height) return '';
            const paddingMap = sizeMap.padding;

            return sizeMap.padding[(props.size as keyof typeof paddingMap)]
        });
        const toggleClass = ref('');
        const onTouchStart = () => {
            toggleClass.value = 'login-btn-toggle';
            setTimeout(() => {
                toggleClass.value = ''
            },800)
        }
        return { activeClass, toggleClass, paddingSize, onTouchStart }
    },
})
</script>
<style>
.login-btn-active:after {
    content:'';
    position: absolute;
    border: 2px solid lightblue;
    
    border-radius: 0.25rem;
    top:0px;left:0px;right:0px;bottom: 0px;
    animation: broderAround 2s linear 0s infinite normal;
}

@keyframes broderAround {
    0% {
        clip-path: circle(40% at 0 0);
    }
    25% {
        clip-path: circle(40% at 100% 0);
    }
    50% {
        clip-path: circle(40% at 100% 100%);
    }
    75% {
        clip-path: circle(40% at 0% 100%);
    }
    100% {
        clip-path: circle(40% at 0 0);
    }
}

.login-btn-toggle {
    animation: toggle .5s linear;
}

@keyframes toggle {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.5;
    }
    100% {
        transform: scale(1.2);
        opacity: 0;
    }
}
</style>
