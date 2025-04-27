module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // make sure to put this on top
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
          'practice-components': './src/components',
          'practice-screens': './src/screens',
          'practice-assets': './src/assets',
          'practice-navigation': './src/navigation',
        },
      },
    ],
  ],
};
