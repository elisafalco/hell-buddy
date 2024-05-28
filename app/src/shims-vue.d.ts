/// <reference types="vite-svg-loader" />
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
 
  export default component;
}

// declare module '*.json' {
//   const value: { [key: string]: any }
//   export default value
// } 