declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module 'animate.css' {
  import {PluginInstallFunction} from 'vue';
  export const install:PluginInstallFunction
}