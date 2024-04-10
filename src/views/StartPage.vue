<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title class="capitalize">{{ "Authorization" }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content :fullscreen="true">
        <div class="small-container">
          <ion-header collapse="condense">
            <ion-toolbar>
              <ion-title class="capitalize" size="large">{{ "Authorization" }}</ion-title>
            </ion-toolbar>
          </ion-header>


          <ion-item>
            <ion-input v-model="apikeyInput" label="API Key" label-placement="floating" placeholder="Enter key"></ion-input>
            <ion-button fill="outline" size="small" shape="round" @click="() => auth()">Submit</ion-button>
          </ion-item>
        </div>

      </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonCard, IonText } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HttpService from '../services/http';
import { error } from '../services/dialog';
import { apikey, setAuth } from '../state/state';

let apikeyInput = ref(apikey.value);
const router = useRouter();

async function auth() {
  try {
    let res: any = (await HttpService.auth(apikeyInput.value)).data;
    setAuth(apikeyInput.value, res.org, res.server, res.orgID, res.serverID, res.version);
    router.push('/domains'); // Redirect to /domains
    apikeyInput.value = '';
  } catch (err) {
    error("Invalid API Key, please try again.");
  }
}
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
