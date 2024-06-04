<template>
  <div
    class="m-show"
    :class="['-' + getStageClass(concert.stage), { '-active': active }]"
    :style="{
      gridRow: getBlocRow(concert.hour),
      height: getBlocHeight(concert) + 'px',
    }"
    @click="emit('update:program', concert.artist)"
  >
    <div class="m-show__artist">{{ unslugify(concert.artist) }}</div>
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

  // Constants
  import { STAGES } from '../../../constants';

  // Components
  import BuddyChip from '@components/Atom/BuddyChip';

  // Utils
  import { unslugify } from '../../../utils';

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  /**
   * getStageClass
   * @param {string} stageArg
   * @returns {string}
   */
  const getStageClass = (stageArg: string): string => {
    const stageObj = STAGES.find((STAGE) => STAGE.label === stageArg);
    if (stageObj) {
      return stageObj.slug;
    }
    return '';
  };

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
