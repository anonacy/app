<template>
  <ion-page>
    <ion-header class="small-menu-button">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="small-container animated fadeIn faster">
        <List :type="path"></List>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonContent, 
  IonPage, 
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton
} from '@ionic/vue';
import List from '../components/List.vue';
import { unpluralize } from '../services/utils';
import { useRoute } from 'vue-router';
const route = useRoute();
const path = unpluralize(route.path.substring(1)); // no plural, remove "/" from start
</script>

<style scoped>

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  /* top: 50%; */
  /* transform: translateY(-50%); */
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
