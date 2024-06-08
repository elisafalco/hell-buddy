<template>
  <Popin class="o-buddysPopin" @close="emit('close')">
    <div class="o-popin__title">Mes buddys</div>
    
    <table class="o-buddysPopin__table m-table">
      <thead>
        <th class="m-table__cell"></th>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <rect
                  width="448"
                  height="80"
                  x="32"
                  y="48"
                  fill="currentColor"
                  rx="32"
                  ry="32"
                />
                <path
                  fill="currentColor"
                  d="M74.45 160a8 8 0 0 0-8 8.83l26.31 252.56a1.5 1.5 0 0 0 0 .22A48 48 0 0 0 140.45 464h231.09a48 48 0 0 0 47.67-42.39v-.21l26.27-252.57a8 8 0 0 0-8-8.83Zm248.86 180.69a16 16 0 1 1-22.63 22.62L256 318.63l-44.69 44.68a16 16 0 0 1-22.63-22.62L233.37 296l-44.69-44.69a16 16 0 0 1 22.63-22.62L256 273.37l44.68-44.68a16 16 0 0 1 22.63 22.62L278.62 296Z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Button variant="wide" @click="emit('open:scan')">Scan a buddy</Button>
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
  import Button from '@components/Atom/Button';
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
<style scoped lang="scss" src="../Popin/style.scss"></style>
<style scoped lang="scss" src="./style.scss"></style>
