<template>
  <div class="a-button" :class="`-${variant}`">
    <slot />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AtomButton',
  };
</script>

<script setup lang="ts">
  // Types
  import type { Props } from './index.d';

  defineProps<Props>();

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./style.scss"></style>
