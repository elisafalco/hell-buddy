<template>
  <div class="a-toggleEdit">
    Edit
    <span v-if="editMode" class="a-toggleEdit__toggle -on">ON</span>
    <span v-else class="a-toggleEdit__toggle -off">OFF</span> 
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AtomToggleEdit',
  };
</script>

<script setup lang="ts">
  // Types
  import type { Props } from './index.d';

  defineProps<Props>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./style.scss"></style>
