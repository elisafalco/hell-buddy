<template>
  <div class="o-popin">
    <div class="o-popin__layover" @click="emit('close')"></div>
    <div class="o-popin__container">
      <div class="o-popin__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "OrganismPopin",
};
</script>

<script setup lang="ts">
// Types
import type { Emits } from "./index.d";

const emit = defineEmits<Emits>();
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./style.scss"></style>
