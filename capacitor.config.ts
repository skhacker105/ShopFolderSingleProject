import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shopfolder.app',
  appName: 'shop-folder-single-project',
  webDir: 'dist/shop-folder-single-project/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
