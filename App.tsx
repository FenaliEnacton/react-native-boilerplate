import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {Button, Platform, SafeAreaView, useColorScheme} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const GOOGLE_ID =
  '484357899033-0vvh7lem2lia40pv91s8r7b4dpji1tv3.apps.googleusercontent.com';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_ID,
      offlineAccess: true,
    });
    return () => {};
  }, []);

  async function googleSingIn() {
    const userInfo = await GoogleSignin.signIn();
    console.log('🚀 ~ googleSingIn ~ userInfo:', userInfo);
  }

  async function facebookLogin() {
    if (Platform.OS === 'android') {
      // LoginManager.setLoginBehavior('web_only');
    }

    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log('🚀 ~ AccessToken.getCurrentAccessToken ~ data:', data);
          });
        }
      })
      .catch(e => console.log(e));
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button onPress={googleSingIn} title="Google SingIn" />
      <Button onPress={facebookLogin} title="Facebook SingIn" />
    </SafeAreaView>
  );
}

export default App;
