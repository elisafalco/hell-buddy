<template>
  <div class="t-homepage">
    <div class="t-homepage__header o-header">
      <div class="m-buddys" @click="showBuddysPopin = true">👩‍❤️‍👨</div>

      <div class="o-header__logo">HELL'BUDDY</div>

      <BuddyChip
        size="big"
        :name="username"
        :background-color="myColor"
        @click="showProfilePopin = true"
      />
    </div>

    <div class="t-homepage__days o-days">
      <button
        type="button"
        class="o-days__button -prev"
        @click="changeDay(currentDay - 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"
          ></path>
        </svg>
      </button>
      <p>{{ DAYS[currentDay].label }}</p>
      <button
        type="button"
        class="o-days__button -next"
        @click="changeDay(currentDay + 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
          ></path>
        </svg>
      </button>
    </div>

    <div class="t-homepage__body">
      <div class="o-planning">
        <div class="o-planning__stages">
          <div
            v-for="stage in STAGES"
            :key="stage.slug"
            class="o-planning__stage"
            :class="'-' + stage.slug"
          >
            <p>{{ stage.label }}</p>
          </div>
        </div>
        <div class="o-planning__hours">
          <div v-for="line in 17" :key="line" class="o-planning__hour">
            {{ getGridHourLabel(line) }}
          </div>
        </div>
        <div class="o-planning__grid">
          <!-- Line -->
          <div
            v-for="line in 17"
            :key="line"
            class="o-planning__line"
            :style="{ top: 60 * line + 'px' }"
          />

          <!-- Concert -->
          <template
            v-for="concert in getConcertsByDay(currentDay)"
            :key="concert.artist"
          >
            <Show
              :active="isInMyProgram(concert.artist)"
              :edit-mode="editMode"
              :concert="concert"
              :buddys="getConcertBuddys(concert.artist)"
              @update:program="
                (artist: string) => editMode && updateMyProgram(artist)
              "
            />
          </template>
        </div>
      </div>
    </div>

    <div
      class="o-editMode"
      :class="editMode ? '-on' : '-off'"
      @click="editMode = !editMode"
    >
      <template v-if="!editMode">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M17.95 16.175L15.1 13.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4zM11 21l-3.175-2.85q-1.8-1.625-3.088-2.9t-2.125-2.4t-1.225-2.175T1 8.475q0-2.35 1.575-3.912T6.5 3q1.3 0 2.475.55T11 5.1q.85-1 2.025-1.55T15.5 3q2.025 0 3.4 1.138T20.775 7H18.65q-.45-1-1.325-1.5T15.5 5q-1.275 0-2.2.688T11.575 7.5h-1.15Q9.65 6.375 8.662 5.688T6.5 5q-1.425 0-2.463.988T3 8.474q0 .825.35 1.675t1.25 1.963t2.45 2.6T11 18.3q.65-.575 1.525-1.325t1.4-1.25l.225.225l.488.488l.487.487l.225.225q-.55.5-1.4 1.238t-1.5 1.312z"
          />
        </svg>
      </template>

      <template v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m11 21l-3.175-2.85q-1.8-1.625-3.088-2.9t-2.125-2.4t-1.225-2.175T1 8.475q0-2.35 1.575-3.912T6.5 3q1.3 0 2.475.538T11 5.075q.85-1 2.025-1.537T15.5 3q2.125 0 3.563 1.288T20.85 7.3q-.5-.2-1.05-.25T18.675 7q-2.125 0-3.9 1.713T13 13q0 1.2.525 2.438T15 17.45q-.475.425-1.237 1.088T12.45 19.7zm6.95-4.825L15.1 13.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4z"
          />
        </svg>
      </template>
    </div>

    <!-- Buddy's popin -->
    <BuddysPopin
      v-if="showBuddysPopin"
      :buddys="buddys"
      @close="showBuddysPopin = false"
      @update:buddys="(value) => (buddys = value)"
      @open:scan="
        showBuddysPopin = false;
        showScanPopin = true;
      "
    />

    <!-- Profile popin -->
    <ProfilePopin
      v-if="showProfilePopin"
      :name="username"
      :color="myColor"
      :qr-code-url="getQRCode"
      @close="showProfilePopin = false"
      @update:profile="({ name, color }) => submitProfileForm(name, color)"
      @open:scan="
        showProfilePopin = false;
        showScanPopin = true;
      "
    />

    <!-- Scan popin -->
    <ScanPopin
      v-if="showScanPopin"
      @close="showScanPopin = false"
      @update:buddys="buddys = getBuddys()"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ViewHomepage',
  };
</script>

<script setup lang="ts">
  import { onMounted, watch, ref, computed } from 'vue';

  // Composables
  import {
    setId,
    getId,
    getUsername,
    setUsername,
    getProgram,
    setProgram,
    setColor,
    getColor,
    getBuddys,
  } from '@/composables';

  // Types
  import { ConcertType } from '@/types/index.d';
  import { ChipBuddyType } from '@components/Molecule/Show/index.d';

  // Constants
  import { DAYS, STAGES, COLORS } from '@/constants';

  // Utils
  import { getISODateFromTimestamp, generateQRCode } from '@/utils';

  // Components
  import BuddyChip from '@components/Atom/BuddyChip';
  import Show from '@components/Molecule/Show';
  import BuddysPopin from '@components/Organism/BuddysPopin';
  import ProfilePopin from '@components/Organism/ProfilePopin';
  import ScanPopin from '@components/Organism/ScanPopin';

  // Data
  import data from '@/data/timetable.json';

  // Variables
  const editMode = ref(false);
  const showProfilePopin = ref(false);
  const showBuddysPopin = ref(false);
  const showScanPopin = ref(false);
  const id = ref(getId());
  const username = ref(getUsername() || '');
  const myColor = ref(getColor() || '');
  const myProgram = ref(getProgram() || []);
  const buddys = ref(getBuddys() || []);
  const concerts = data as ConcertType[];
  const currentDay = ref(0);

  /*********************/
  /***** FUNCTIONS *****/
  /*********************/
  /**
   * getConcertsByDay
   * @param {number} dayIndex
   * @returns {ConcertType[]}
   */
  const getConcertsByDay = (dayIndex: number): ConcertType[] => {
    if (dayIndex >= 0 && dayIndex <= 4) {
      return concerts.filter((concert) => {
        const concertIso = getISODateFromTimestamp(concert.ts);
        if (concertIso) {
          return (
            concertIso > DAYS[dayIndex].ISOFrom &&
            concertIso < DAYS[dayIndex].ISOTo
          );
        }
      });
    }
    return [];
  };

  /**
   * getGridHourLabel
   * @param {number} timeIndex
   * @returns {string}
   */
  const getGridHourLabel = (timeIndex: number): string => {
    let label = 9 + timeIndex;

    // Deal with hours after midnight
    if (label >= 24) {
      label = label - 24;
    }
    // Prepend a zero if single digit
    return label.toString().padStart(2, '0') + 'h';
  };

  /**
   * updateMyProgram
   * @param {string} bandName
   */
  const updateMyProgram = (bandName: string) => {
    const foundIndex = myProgram.value.findIndex(
      (element) => element === bandName,
    );
    if (foundIndex > -1) {
      myProgram.value.splice(foundIndex, 1);
    } else {
      myProgram.value.push(bandName);
    }
  };

  /**
   * isInMyProgram
   * @param {string} bandName
   * @returns {boolean}
   */
  const isInMyProgram = (bandName: string) => {
    const foundIndex = myProgram.value.findIndex(
      (element) => element === bandName,
    );

    return foundIndex > -1;
  };

  /**
   * handleSetUsername
   */
  const handleSetUsername = () => {
    username.value = window.prompt('Choose your username pliz boï') || '';

    if (username.value) {
      setUsername(username.value);
    }
  };

  /**
   * submitProfileForm
   * @param {string} name
   * @param {string} color
   */
  const submitProfileForm = (name: string, color: string) => {
    if (name && name !== username.value) {
      username.value = name;
      setUsername(username.value);
    }
    if (color && color !== myColor.value) {
      myColor.value = color;
      setColor(myColor.value);
    }

    showProfilePopin.value = false;
  };

  /**
   * getConcertBuddys
   * @param {string} bandName
   * @returns {ChipBuddyType[]}
   */
  const getConcertBuddys = (bandName: string): ChipBuddyType[] => {
    const chips: ChipBuddyType[] = buddys.value
      .filter((buddy) => buddy.program.includes(bandName))
      .map((buddy) => {
        return { id: buddy.id, username: buddy.username, color: buddy.color };
      });
    return chips;
  };

  /**
   * changeDay
   * @param {number} desiredDayIndex
   */
  const changeDay = (desiredDayIndex: number) => {
    if (desiredDayIndex >= 0 && desiredDayIndex <= 3) {
      currentDay.value = desiredDayIndex;
    }
  };

  /**
   * getQRCode
   * @returns {string}
   */
  const getQRCode = computed(() => {
    if (id.value && username.value && myColor.value) {
      const base64Code = generateQRCode(
        id.value,
        username.value,
        myColor.value,
        myProgram.value,
      );
      return base64Code;
    }
    return '';
  });

  /******************/
  /**** WATCHERS ****/
  /******************/
  watch(
    () => myProgram,
    (newProgram) => {
      setProgram(newProgram.value);
    },
    { deep: true },
  );

  /*******************/
  /**** LIFECYCLE ****/
  /*******************/
  onMounted(() => {
    if (!username.value) {
      handleSetUsername();
      setId();
      id.value = getId();
    }
    if (!myColor.value) {
      const newColor = COLORS[Math.floor(Math.random() * 3)];
      setColor(newColor);
      myColor.value = newColor;
    }
  });
</script>

<style lang="scss" src="./style.scss"></style>
