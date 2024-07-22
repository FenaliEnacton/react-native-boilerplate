module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
          '@assets': './src/Assets/',
          '@components/core': './src/Components/Core/',
          '@components/generic': './src/Components/Generic/',
          '@components/user': './src/Components/User/',
          '@react-native-config': './src/react-native-config/',
          '@app_redux': './src/Redux/',
          // '@app_redux/Actions': './src/Redux/Actions/',
          '@user_redux': './src/Redux/user_redux/',
          '@translations': './src/translations/',
        },
      },
    ],
  ],
};
