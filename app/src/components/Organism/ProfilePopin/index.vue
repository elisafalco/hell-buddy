<template>
  <Popin class="o-profilePopin" @close="emit('close')">
    <div class="o-popin__content">
      <!-- QR Code -->
      <div class="o-popin__title">Mon QR code</div>
      <div class="o-qrCode">
        <img class="o-qrCode__image" :src="qrCodeUrl" />

        <Button variant="wide" @click="emit('open:scan')">
          Scan a buddy
        </Button>
      </div>

      <!-- Profile form -->
      <div class="o-popin__title">Mes infos</div>
      <div class="o-profileForm">
        <!-- Name -->
        <div class="o-profileForm__field">
          <div class="o-profileForm__label">Prénom</div>
          <input
            v-model="formData.name"
            class="o-profileForm__input a-input"
            type="text"
          />
        </div>

        <!-- Couleur -->
        <div class="o-profileForm__field">
          <div class="o-profileForm__label">Couleur</div>
          <div class="o-profileForm__colors">
            <div
              v-for="colorItem in COLORS"
              :key="colorItem"
              class="a-color"
              :class="{ '-active': colorItem === formData.color }"
              :style="{ background: colorItem }"
              @click="formData.color = colorItem"
            />
          </div>
        </div>

        <Button variant="wide" @click="emit('update:profile', formData)">
          Enregistrer
        </Button>
      </div>
    </div>
  </Popin>
</template>

<script lang="ts">
  export default {
    name: 'OrganismProfilePopin',
  };
</script>

<script setup lang="ts">
  import { reactive } from 'vue';

  // Types
  import type { Emits, Props } from './index.d';

  // Constants
  import { COLORS } from '@/constants';

  // Components
  import Button from '@components/Atom/Button';
  import Popin from '@components/Organism/Popin';

  const emit = defineEmits<Emits>();
  const props = defineProps<Props>();

  const formData = reactive({
    name: props.name,
    color: props.color,
  });
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="../Popin/style.scss"></style>
<style scoped lang="scss" src="./style.scss"></style>
