<template>
  <Popin class="o-buddysPopin" @close="emit('close')">
    <div class="o-popin__title">Mes buddys</div>
    <table class="o-buddysPopin__table m-table">
      <thead>
        <th></th>
        <th class="m-table__cell -name">Nom</th>
        <th class="m-table__cell -scanTs">Dernier scan</th>
        <th class="m-table__cell -action">Supprimer</th>
      </thead>
      <tbody>
        <tr v-for="buddy in buddys" :key="buddy.id">
          <td class="m-table__cell -chip">
            <BuddyChip :name="buddy.username" :background-color="buddy.color" />
          </td>
          <td class="m-table__cell -name">{{ buddy.username }}</td>
          <td class="m-table__cell -scanTs">
            {{ getLocaleStringFromTimestamp(buddy.scanTS) }}
          </td>
          <td class="m-table__cell -action">
            <button type="button" @click="handleDeleteBuddy(buddy.id)">
              ❌
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </Popin>
</template>

<script lang="ts">
  export default {
    name: 'OrganismBuddysPopin',
  };
</script>

<script setup lang="ts">
  // Types
  import type { Emits, Props } from './index.d';

  // Composables
  import { deleteBuddy } from '@/composables';

  // Components
  import Popin from '@components/Organism/Popin';
  import BuddyChip from '@components/Atom/BuddyChip';

  // Utils
  import { getLocaleStringFromTimestamp } from '@/utils';

  const emit = defineEmits<Emits>();
  defineProps<Props>();

  /**
   * handleDeleteBuddy
   * @param {string} id
   */
  const handleDeleteBuddy = (id: string) => {
    emit('update:buddys', deleteBuddy(id));
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./style.scss"></style>
