<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="push" class="no-select">
        <ion-content class="ion-padding">
          <div class="menu-container">
              
            <div class="monospace">
              <ion-list-header>{{ org }}</ion-list-header>
              <ion-note>{{ serverName }}</ion-note>
              <!-- <hr/> -->
            </div>
            <ion-list v-if="apikey">
              <ion-menu-toggle 
                :auto-hide="false" v-for="(p, i) in appPages"
                :key="i">
                  <hr v-if="p.seperator" />
                  <ion-item 
                  tappable 
                  router-direction="root" 
                  :router-link="p.url" 
                  lines="none" 
                  class="hydrated" 
                  :class="{ selected: p.url === String($route.path).toLowerCase() }">
                    <ion-icon 
                      aria-hidden="true" 
                      slot="start" 
                      :ios="p.url === String($route.path).toLowerCase() ? p.iconSelected : p.icon"
                    </ion-icon>
                    <ion-label class="monospace">{{ p.title }}</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>

            <div class="monospace bottom-block">
                <ion-chip class="chip-note" @click="toggleDark">
                  <ion-icon 
                    :ios="dark ? moon : sunny" 
                    :color="dark ? 'primary' : 'medium'">
                  </ion-icon>
                  <ion-label v-if="dark">
                    Theme&nbsp;<span class="text-primary">dark</span>
                  </ion-label>
                  <ion-label v-if="!dark">
                    Theme&nbsp;<span class="text-primary">light</span>
                  </ion-label>
                </ion-chip>
                <ion-chip v-if="apikey" class="chip-note" @click="() => removeKey()">
                  <ion-icon :ios="key" :color="dark ? 'primary' : 'medium'"></ion-icon>
                  <ion-label>
                    Logout&nbsp;<span class="text-primary">API&nbsp;Key</span>
                  </ion-label>
                </ion-chip>
                <a class="monospace" target="_blank" href="https://github.com/anonacy/app" title="View Source Code">
                  <ion-chip class="chip-note">
                    <ion-avatar>
                      <img v-if="!dark" alt="Anonacy Logo" src="./assets/light96.png" />
                      <img v-if="dark" alt="Anonacy Logo" src="./assets/purple96.png" />
                    </ion-avatar>
                    <ion-label>
                      @anonacy/app&nbsp;<span class="text-primary">v{{ version }}</span>
                    </ion-label>
                  </ion-chip>
                </a>
                <a class="monospace" target="_blank" href="https://github.com/anonacy/api" title="View Source Code">
                  <ion-chip class="chip-note">
                    <ion-avatar>
                      <img v-if="!dark" alt="Anonacy Logo" src="./assets/light96.png" />
                      <img v-if="dark" alt="Anonacy Logo" src="./assets/purple96.png" />
                    </ion-avatar>
                    <ion-label>
                      @anonacy/api&nbsp;<span class="text-primary" v-if="apiversion">v{{ apiversion }}</span>
                    </ion-label>
                  </ion-chip>
                </a>
                <a class="monospace" target="_blank" href="https://api2.anonacy.com/docs/">
                  <ion-chip class="chip-note" >
                    <ion-avatar>
                      <img v-if="!dark" alt="Anonacy Logo" src="./assets/light96.png" />
                      <img v-if="dark" alt="Anonacy Logo" src="./assets/purple96.png" />
                    </ion-avatar>
                    <ion-label>
                      API&nbsp;<span class="text-primary">Documentation</span>
                    </ion-label>
                  </ion-chip>
                </a>
                <!-- <a class="monospace" target="_blank" href="https://github.com/hewham/anonacy-puppet">
                  <span class="text-primary">View Source Code</span>
                </a> -->
              </div>
            </div>
          </ion-content>
        </ion-menu>
      <ion-router-outlet id="main-content" :animation="mdTransitionAnimation"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  IonChip,
  IonAvatar
} from '@ionic/vue';
import {
  mailOutline,
  mail,
  globeOutline,
  globe,
  flagOutline,
  send,
  sendOutline,
  flag,
  key,
  moon,
  sunny
} from 'ionicons/icons';
import { mdTransitionAnimation } from '@ionic/core'
import { version } from '../package.json';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { apikey, rmAuth, org, serverName, apiversion } from './state/state';
const router = useRouter();

const dark = ref(true);
document.body.classList.toggle('dark', dark.value);

function toggleDark() {
  dark.value = !dark.value;
  document.body.classList.toggle('dark', dark.value);
}

function removeKey() {
  rmAuth();
  router.replace('/auth'); // Redirect to /auth
}

const appPages = [
  {
    title: 'Domains',
    url: '/domains',
    icon: globeOutline,
    iconSelected: globe,
    seperator: true
  },
  {
    title: 'Endpoints',
    url: '/endpoints',
    icon: flagOutline,
    iconSelected: flagOutline,
    seperator: false
  },
  {
    title: 'Aliases',
    url: '/aliases',
    icon: mailOutline,
    iconSelected: mail,
    seperator: false
  },
  {
    title: 'Messages',
    url: '/messages',
    icon: sendOutline,
    iconSelected: send,
    seperator: true
  },
];
</script>

<style scoped>
ion-menu{
  max-width: 250px;
}

.menu-container {
  background: var(--ion-window-color);
  border-radius: 16px;
  height: 100%;
  padding: 12px;
}

ion-item, ion-list {
  background: transparent;
  --background: transparent;
}

ion-menu ion-content{
  --background: var(--ion-background-color);
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
  text-decoration: underline;
}
</style>
