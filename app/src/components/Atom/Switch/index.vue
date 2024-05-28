<template>
  <div class="a-switch" :class="{ '-checked': props.value }" @click="emit('update:value', !props.value)">
    <div class="a-switch__toggle" />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AtomSwitch',
  };
</script>

<script setup lang="ts">
  // Types
  import type { Props, Emits } from './index.d';

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./style.scss"></style>
