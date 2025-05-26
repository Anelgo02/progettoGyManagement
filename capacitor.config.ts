import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Gymanagement.app',
  appName: 'Gymanagement',
  webDir: 'www',
  server: {
    cleartext: true,  
    url: 'http://192.168.1.101:8100', // Use your server's IP address and port
  },
  /*android: {
    allowMixedContent: true,
    
  }*/
};

export default config;
