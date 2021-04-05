<template>
    <div class="relative" :style="baseSyleSize">
        <div 
        :class="className"
        :style="baseSyleSize">
        </div>
        <div
            class="absolute inset-2 cursor-pointer z-10 rounded flex items-center justify-center bg-indigo-700 shadow-md text-white"
        >
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
    name: 'login-button',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '120px'
        },
        height: {
            type: String,
            default: "30px",
        }
    },
    setup(props, ctx) {
        const className = computed(() => {
            if (props.loading) return 'login-btn-active'
            return 'login-btn'
        });
        const baseSyleSize = computed(() => {
            return `width:${parseInt(props.width)+15}px;height:${parseInt(props.height)+15}px`
        })
        return { className,baseSyleSize }
    },
})
</script>
<style>
.login-btn {
    padding: 10px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.login-btn-active {
    border: 2px solid lightblue;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0.25rem;
    padding: 10px;
    z-index: 9;
    box-sizing: border-box;
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
</style>
