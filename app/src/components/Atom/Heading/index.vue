<template>
  <component :is="tag" :class="`a-heading -${variant}`">
    <slot />
  </component>
</template>

<script lang="ts">
  export default {
    name: 'AtomHeading',
  };
</script>

<script setup lang="ts">
  // Types
  import type { Props } from './index.d';

  withDefaults(defineProps<Props>(), {
    variant: 'h1Bold',
    tag: 'h1',
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./style.scss"></style>
