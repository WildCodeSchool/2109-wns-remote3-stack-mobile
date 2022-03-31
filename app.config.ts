import 'dotenv/config';

export default {
  expo: {
    name: '-wns-remote-stack-mobile',
    scheme: 'wnsremotestackmobile',
    version: '1.0.0',
    extra: {
      // Add your extra configs here
      apiKey: process.env.API_KEY,
    },
  },
};
