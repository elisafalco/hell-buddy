<template>
  <Popin class="o-scanPopin" @close="emit('close')">
    <div class="o-popin__title">Scanner un buddy</div>
    <div>
      <video ref="scanVideo" class="o-scanPopin__video"></video>
    </div>
  </Popin>
</template>

<script lang="ts">
  export default {
    name: 'OrganismBuddysPopin',
  };
</script>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import QrScanner from 'qr-scanner';

  // Types
  import type { Emits, QrScannerType, ScanResult } from './index.d';
  

  // Composables
  import { addBuddy } from '@/composables';

  // Components
  import Popin from '@components/Organism/Popin';

  const emit = defineEmits<Emits>();

  const scanVideo = ref<HTMLVideoElement | undefined>();
  let qrScanner: QrScannerType;
  const options = {
    highlightScanRegion: true,
    alsoTryWithoutScanRegion: true,
  };

  /**
   * startScan
   */
  const startScan = () => {
    if (scanVideo.value) {
      qrScanner.start();
    }
  };

  const stopScan = () => {
    qrScanner.stop();
    qrScanner.destroy();
  };

  /**
   * saveBuddysProgram
   * @param {string} buddy
   */
  const saveBuddysProgram = (buddy: string) => {
    addBuddy(buddy);
    emit('update:buddys');
  };

  onMounted(() => {
    if (scanVideo.value) {
      qrScanner = new QrScanner(
        scanVideo.value,
        (result: unknown) => {
          const castResult: ScanResult = result as ScanResult;
          // console.log(castResult);
          stopScan();
          saveBuddysProgram(castResult.data);
        },
        options,
      );
    }
    startScan();
  });

  onUnmounted(() => {
    stopScan();
  });
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="../Popin/style.scss"></style>
<style scoped lang="scss" src="./style.scss"></style>
