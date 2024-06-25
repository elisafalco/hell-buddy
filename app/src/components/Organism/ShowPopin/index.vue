<template>
  <Popin class="o-showPopin" @close="emit('close')">
    <div>
      <Heading class="o-showPopin__artist">
        {{ unslugify(concert.artist) }}
      </Heading>

      <div class="o-showPopin__infos">
        <p class="o-showPopin__stage" :class="'-' + getStageClass(concert.stage)">
          {{ concert.stage }}
        </p>
        
        <p class="o-showPopin__hour">
          {{ concert.hour }}
        </p>
      </div>

      <Heading class="o-showPopin__buddysTitle">
        👩‍❤️‍👨 Les buddys 
      </Heading>
      
      <div class="o-showPopin__buddys">
        <template v-if="buddys.length">
          <div v-for="buddy in buddys" :key="buddy.id" class="o-showPopin__buddy">
            <BuddyChip :name="buddy.username" :background-color="buddy.color" />
            <span class="">{{ buddy.username }}</span>
          </div>
        </template>
        <template v-else>
          <div class="o-showPopin__noBuddy">
            Déso, personne ne veut voir ce groupe... <sup>cheh</sup>
          </div>
        </template>
      </div>
    </div>
  </Popin>
</template>

<script lang="ts">
  export default {
    name: 'OrganismShowPopin',
  };
</script>

<script setup lang="ts">
  // Types
  import type { Emits, Props } from './index.d';

  import { unslugify, getStageClass } from '../../../utils';

  // Components
  import Heading from '@components/Atom/Heading';
  import BuddyChip from '@components/Atom/BuddyChip';
  import Popin from '@components/Organism/Popin';

  const emit = defineEmits<Emits>();
  defineProps<Props>();

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="../Popin/style.scss"></style>
<style scoped lang="scss" src="./style.scss"></style>
