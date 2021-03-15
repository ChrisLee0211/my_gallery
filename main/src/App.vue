<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="servless test" />
  <router-view />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
