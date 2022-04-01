import 'dotenv/config';

export default {
  expo: {
    name: '2109-wns-remote3-stack-mobile',
    slug: '2109-wns-remote3-stack-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/logo.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: 'com.stack.wcs_stack_mobile',
      adaptiveIcon: {
        backgroundColor: '#ffffff',
      },
    },
    extra: {
      // Add your extra configs here
      apiKey: process.env.API_KEY,
      wsUri: process.env.WS_URI,
    },
  },
};
