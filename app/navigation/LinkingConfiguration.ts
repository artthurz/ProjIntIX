import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Login: {
            screens: {
              Login: 'one',
            },
          },
          Project: {
            screens: {
              CreateProject: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
