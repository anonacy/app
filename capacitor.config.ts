import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.anonacy.app',
  appName: '@anonacy/app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
