<template>
  <div
    class="m-show"
    :class="['-' + getStageClass(concert.stage), { '-active': active }]"
    :style="{
      gridRow: getBlocRow(concert.hour),
      height: getBlocHeight(concert) + 'px',
    }"
    @click="
      editMode ? emit('update:program', concert.artist) : emit('open:popin')
    "
  >
    <div class="m-show__artist">
      <div v-if="active" class="m-show__heart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29c2.64-1.8 5.9-.96 7.66 1.1c1.76-2.06 5.02-2.91 7.66-1.1c1.41.96 2.28 2.59 2.34 4.29c.14 3.88-3.3 6.99-8.55 11.76z"
          />
        </svg>
      </div>

      <div v-else-if="editMode" class="m-show__heart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19.66 3.99c-2.64-1.8-5.9-.96-7.66 1.1c-1.76-2.06-5.02-2.91-7.66-1.1c-1.4.96-2.28 2.58-2.34 4.29c-.14 3.88 3.3 6.99 8.55 11.76l.1.09c.76.69 1.93.69 2.69-.01l.11-.1c5.25-4.76 8.68-7.87 8.55-11.75c-.06-1.7-.94-3.32-2.34-4.28M12.1 18.55l-.1.1l-.1-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05"
          />
        </svg>
      </div>

      {{ unslugify(concert.artist) }}
    </div>
    <!-- <div class="m-show__hour">{{ concert.hour }}</div> -->
    <div v-if="getBuddys().length" class="m-show__buddys">
      <div
        v-for="buddy in getBuddys()"
        :key="buddy.id"
        class="m-show__buddysItem"
      >
        <BuddyChip :name="buddy.username" :background-color="buddy.color" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'MoleculeShow',
  };
</script>

<script setup lang="ts">
  // Types
  import type { Props, Emits, ChipBuddyType } from './index.d';
  import { ConcertType } from '../../../types/index.d';

  // Components
  import BuddyChip from '@components/Atom/BuddyChip';

  // Utils
  import { unslugify, getStageClass } from '../../../utils';

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  /**
   * getBlocHeight
   * @param {ConcertType} concertArg
   * @returns {number}
   */
  const getBlocHeight = (concertArg: ConcertType): number => {
    const startTime = concertArg.hour.split(' - ')[0];
    const endTime = concertArg.hour.split(' - ')[1];

    const startDateTime = new Date(concertArg.date);
    const endDateTime = new Date(concertArg.date);

    if (endTime.split(':')[0] < startTime.split(':')[0]) {
      endDateTime.setDate(endDateTime.getDate() + 1);
    }

    startDateTime.setHours(parseInt(startTime.split(':')[0], 10));
    startDateTime.setMinutes(parseInt(startTime.split(':')[1], 10));

    endDateTime.setHours(parseInt(endTime.split(':')[0], 10));
    endDateTime.setMinutes(parseInt(endTime.split(':')[1], 10));

    return (endDateTime.getTime() - startDateTime.getTime()) / 1000 / 60 || 60;
  };

  /**
   * getBlocRow
   * @param {string} hoursArg
   * @returns {number}
   */
  const getBlocRow = (hoursArg: string): number => {
    const startTime: string = hoursArg.split(' - ')[0];
    const startHour: number = parseInt(startTime.split(':')[0], 10);
    const startMinutes: number = parseInt(startTime.split(':')[1], 10);
    let minutesToTen = 0;

    if (startHour >= 10) {
      minutesToTen = (startHour - 10) * 60 + startMinutes;
    } else {
      minutesToTen = 14 * 60 + startHour * 60 + startMinutes;
    }

    return minutesToTen / 5 + 1;
  };

  /**
   * getBuddys
   * @returns {ChipBuddyType[]}
   */
  const getBuddys = (): ChipBuddyType[] => {
    let displayedBuddys: ChipBuddyType[] = props.buddys;
    displayedBuddys.map((buddy) => (buddy.username = buddy.username[0]));
    if (props.buddys.length > 4) {
      displayedBuddys = props.buddys.slice(0, 3);
      displayedBuddys.push({
        id: Date.now().toString(),
        username: `+ ${props.buddys.length - 3}`,
        color: 'transparent',
      });
    }

    return displayedBuddys;
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./style.scss"></style>
