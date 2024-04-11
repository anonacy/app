<template>
  <ion-page>
    <!-- <ion-header class="small-menu-button">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="router.back">
            <ion-icon :ios="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header> -->

    <ion-content :fullscreen="true">
      <div id="small-container animated fadeIn faster">
        <DnsSetup :domain="domain"></DnsSetup>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonContent,
  IonPage
} from '@ionic/vue';
import { useRouter, useRoute } from 'vue-router';
import DnsSetup from '../components/DnsSetup.vue';

const router = useRouter();
const route = useRoute();
const domain = route.params.domain;

</script>

<style scoped>

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
