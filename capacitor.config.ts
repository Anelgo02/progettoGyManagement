import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Gymanagement.app',
  appName: 'Gymanagement',
  webDir: 'www',
  server: {
    url: 'http://172.18.0.2:5000', // sostituisci con IP locale PC e porta backend
    cleartext: true
  }
};


export default config;
