<template>
    <div :class="`relative flex items-center justify-center box-content p-2 ${activeClass}`">
        <div
            :class="`py-2 px-6 rounded flex items-center justify-center bg-indigo-700 shadow-md text-white`"
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
        },
        size: {
            type: String,
            default: 'small'
        }
    },
    setup(props, ctx) {
        const activeClass = computed(() => {
            if (props.loading) return 'login-btn-active'
            return ''
        });
        return { activeClass }
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
</style>
