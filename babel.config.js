module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['./src'],
        alias: {
          '@redux': './src/redux',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@themes': './src/themes',
          '@components': './src/components',
          '@config': './src/config',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
