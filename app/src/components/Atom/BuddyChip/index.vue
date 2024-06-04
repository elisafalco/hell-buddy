<template>
  <div :style="{ background: backgroundColor }" class="a-buddyChip">
    {{ firstLetter }}
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AtomBuddyChip',
  };
</script>

<script setup lang="ts">
  // Types
  import type { Props } from './index.d';

  const props = defineProps<Props>();

  const firstLetter = props.name.trim()[0]

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./style.scss"></style>
