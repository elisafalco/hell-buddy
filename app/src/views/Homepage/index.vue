<template>
  <div class="t-homepage">
    <div class="t-homepage__header o-header">
      <div class="o-header__left">
        <ToggleEdit :edit-mode="editMode" @click="editMode = !editMode" />
        <div class="m-buddys" @click="showBuddysPopin = true">Buddys</div>
      </div>
      <div class="o-header__logo">
        <Heading>HELL'BUDDY 👹</Heading>
      </div>

      <div class="o-header__right">
        <div class="m-profile" @click="showProfilePopin = true">
          <div class="m-profile__color" :style="{ backgroundColor: color }" />
          <div class="m-profile__name">{{ username }}</div>
        </div>
      </div>
    </div>

    <div class="t-homepage__days">
      <div class="t-homepage__daysItem" @click="changeDay(currentDay - 1)">
        ⬅️
      </div>
      <p>{{ DAYS[currentDay].label }}</p>
      <div class="t-homepage__daysItem" @click="changeDay(currentDay + 1)">
        ➡️
      </div>
    </div>

    <div class="t-homepage__body">
      <div class="o-planning">
        <div class="o-planning__stages">
          <div
            v-for="stage in STAGES"
            :key="stage.slug"
            class="o-planning__stage"
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

    <!-- Buddy's popin -->
    <BuddysPopin
      v-if="showBuddysPopin"
      :buddys="buddys"
      @close="showBuddysPopin = false"
      @update:buddys="(value) => (buddys = value)"
    />

    <!-- Profile popin -->
    <Popin v-if="showProfilePopin" @close="showProfilePopin = false">
      <div class="o-popin__content">
        <!-- QR Code -->
        <div class="o-popin__title">Mon QR code</div>
        <div class="o-qrCode">
          <div v-show="scanMode">
            <video ref="scanVideo" class="o-qrCode__video"></video>
          </div>
          <img v-show="!scanMode" class="o-qrCode__image" :src="getQRCode" />

          <button
            v-if="!scanMode"
            type="button"
            class="o-qrCode__button"
            @click="
              scanMode = true;
              startScan();
            "
          >
            Scan a buddy
          </button>

          <button
            v-else
            type="button"
            class="o-qrCode__button"
            @click="
              scanMode = false;
              stopScan();
            "
          >
            Close camera
          </button>
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

          <button
            type="button"
            class="o-profileForm__button"
            @click="submitProfileForm()"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </Popin>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ViewHomepage',
  };
</script>

<script setup lang="ts">
  import { onMounted, watch, ref, reactive, computed } from 'vue';
  import QrScanner from 'qr-scanner';

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
    addBuddy,
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
  import Heading from '@components/Atom/Heading';
  import ToggleEdit from '@components/Atom/ToggleEdit';
  import Show from '@components/Molecule/Show';
  import Popin from '@components/Organism/Popin';
  import BuddysPopin from '@components/Organism/BuddysPopin';

  // Data
  import data from '@/data/timetable.json';

  // Variables
  const editMode = ref(false);
  const scanMode = ref(false);
  const showProfilePopin = ref(false);
  const showBuddysPopin = ref(false);
  const id = ref(getId());
  const username = ref(getUsername());
  const color = ref(getColor() || '');
  const myProgram = ref(getProgram() || []);
  const buddys = ref(getBuddys() || []);
  const concerts = data as ConcertType[];
  const currentDay = ref(0);
  const scanVideo = ref<HTMLVideoElement | undefined>();
  const formData = reactive({
    name: username.value,
    color: color.value,
  });

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
    username.value = window.prompt('Choose your username pliz boï');

    if (username.value) {
      setUsername(username.value);
    }
  };

  /**
   * submitProfileForm
   */
  const submitProfileForm = () => {
    if (formData.name && formData.name !== username.value) {
      username.value = formData.name;
      setUsername(username.value);
    }
    if (formData.color && formData.color !== color.value) {
      color.value = formData.color;
      setColor(color.value);
    }

    showProfilePopin.value = false;
  };

  /**
   * startScan
   */
  const startScan = () => {
    if (scanVideo.value) {
      const qrScanner = new QrScanner(
        scanVideo.value,
        (result) => {
          // console.log('decoded qr code:', result);
          qrScanner.stop();
          scanMode.value = false;
          saveBuddysProgram(result.data);
        },
        { returnDetailedScanResult: true },
      );

      qrScanner.start();
    }
  };

  /**
   * stopScan
   */
  const stopScan = () => {
    // TODO
  };

  /**
   * saveBuddysProgram
   * @param {string} buddy
   */
  const saveBuddysProgram = (buddy: string) => {
    addBuddy(buddy);
    buddys.value = getBuddys() || [];
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
    if (id.value && username.value && color.value) {
      const base64Code = generateQRCode(
        id.value,
        username.value,
        color.value,
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
    if (!color.value) {
      const newColor = COLORS[Math.floor(Math.random() * 3)];
      setColor(newColor);
      color.value = newColor;
    }
    formData.name = username.value;
    formData.color = color.value;
  });
</script>

<style lang="scss" src="./style.scss"></style>
