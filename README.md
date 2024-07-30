# SDK 34 Migration TODO

## TODO: List

1. pkgname: [ ] android [ ] iOS
   a. command: npx react-native-rename "Coupon.AE" --iosBundleID "com.app.couponae" --androidBundleID "com.app.couponae"
   b. need to change google-services.json file
2. icon: [ ] android [ ] iOS
   a. for android android studio -> file -> new -> image asset -> choose logo and create it
   b. for ios hed to site https://www.appicon.co/ and chose logo and generet for ios and ipad ,download zip file and unzip it, go to xCode , project-> find image and copy pest AppIcon.appiconset from downloaded zip in to image
3. splashscreen: [ ] android [ ] iOS
   a. for android replace image in drwable folder
   b. for ios replace image in xcode under name of launch screen, if you not geting change then delete app, close simuletor and start again.
4. fb auth: [ ] android [ ] iOS
   a. for android replace value in string.xml
   b. for iOS change credential in info.paylist
5. google auth: [ ] android [ ] iOS
   a. for android no need to change in native code
   b. for iso change url info in xcode
6. apple auth: [ ] iOS
   a. add signin capeblity in xcode project
7. code push: [ ] android [ ] iOS
   a. for android change creit in string.xml
   b. for ios change credit nin info.paylist
8. one signal: [ ] android [ ] iOS
   a.for android no native change needed
   b. for iOS follow this doc https://documentation.onesignal.com/docs/react-native-sdk-setup#2-ios-setup or in xcode jsut add sign in competiblity of push notification and background mode with remote notification
9. copy root asset folder : [ ] android [ ] iOS
   look for Tips->2
10. add font in xcode : [ ] iOS
11. copy native file permission : [ ] android
12. DeepLInk : [ ] android [ ] iOS
13. copy keystore : [ ] android

## code push

### Android -

### iOS -

# PKG List which need to change

1. "@react-native-community/clipboard" To @react-native-clipboard/clipboard
2. "@react-native-google-signin/google-signin" To ""@react-native-google-signin/google-signin""

# PKG List which need to remove

1.  "react-native-flipper"
2.  "react-native-translucent-modal" => use react native model

# PKG List which must have old version

1. "react-redux": "^8.0.1",
2. "redux-actions": "^2.6.5",
3. "redux-logger": "^3.0.6",
4. "redux-saga": "^1.1.3",
5. "reselect": "^4.1.5",
6. "i18n-js": "^3.9.2",

### Tips

1. command to check pkg update is avaliable or not : npx npm-check-updates -u && npm i
2. text is not as same as old
   a. copy asset folder from root dir
   b. copy react-native-config from root dir
   c. apply command "npx react-native-asset"

### Errors and Solution

1.  react-native-community/clipboard :
    if you find error at pod install like visionos is not define or something then just comment that line in pkg

2.  error: index.js: Cannot find module 'babel-plugin-module-resolver'
    run this in cmd => npm install --save-dev babel-plugin-module-resolver --force
    and run application with => npm start -- --reset-cache

3.  error is something like

```
    const middlewares = [sagaMiddleware, logger];
    21 | if (**DEV**) {
    > 22 | const createDebugger = require('redux-flipper').default;
         |                                     ^
    23 | middlewares.push(createDebugger());
    24 | }
    25 | const enhancer = compose(applyMiddleware(...middlewares));
```

solustion : change store file with this code

1.  add pkg :=> npm i redux --legacy-peer-deps

```javascript
// import reducers from '@reducers';
import sagas from './Sagas';
import createSagaMiddleware from 'redux-saga';
import {compose, applyMiddleware, createStore} from 'redux';
// import MainStackNavigator from 'src/navigation/AppNavigator';

import reducers from './Reducers';
// console.disableYellowBox = true;

//create all middleware and add these to redux store
export const sagaMiddleware = createSagaMiddleware();
import {createLogger} from 'redux-logger';

export default () => {
  const logger = createLogger({
    predicate: () => true,
    diff: true,
    duration: true,
  });
  const middlewares = [sagaMiddleware, logger];
  if (__DEV__) {
    const logger = createLogger({
      // ...options
      predicate: () => true,
      diff: true,
      duration: true,
    });
    middlewares.push(logger);
    // const createDebugger = require('redux-flipper').default;
    // middlewares.push(createDebugger());
  }
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(sagas);
  return {store};
};
```

4. error: Error: While trying to resolve module `redux-actions` from file `/Users/enacton/Documents/App/LarabackPro/SDK34/coupon.ae/src/Redux/Actions/metaDataActions.js`, the package `/Users/enacton/Documents/App/LarabackPro/SDK34/coupon.ae/node_modules/redux-actions/package.json` was successfully found. However, this package itself specifies a `main` module field that could not be resolved (`/Users/enacton/Documents/App/LarabackPro/SDK34/coupon.ae/node_modules/redux-actions/index`. Indeed, none of these files exist:

solustion : make sure you are using this pkg with same version name

```
    1. "react-redux": "^8.0.1",
    2. "redux-actions": "^2.6.5",
    3. "redux-logger": "^3.0.6",
    4. "redux-saga": "^1.1.3",
    5. "reselect": "^4.1.5",
```

=> Note : make sure to invelid cache and restart android studio

5. TypeError: Cannot read property 'style' of undefined, js engine: hermes
   => go to that file and add ? where it needed or find patch pkg in this project and apply it

6. Error: [Reanimated] Failed to create a worklet.
   => add this in abable.config.js as last plugin
   ```javascript
        module.exports = {
   presets: [
     ... // don't add it here :)
   ],
   plugins: [
     ...
     'react-native-reanimated/plugin',
   ],
   };
   ```
7. TypeError: Cannot read property 't' of undefined
   => make sure you are using this pkg

   ```javascript
       "i18n-js": "^3.9.2",
   ```

8. OneSignal error
   => make sure to use new oneSignal syntax

   ```javascript
   //import should look like
   import {LogLevel, OneSignal} from 'react-native-onesignal';

   //init code start (File: appnavigetor)
   OneSignal.initialize(Config.ONE_SIGNAL, {});
   OneSignal.Debug.setLogLevel(LogLevel.Verbose);
   OneSignal.Notifications.canRequestPermission().then(res => {
     if (res) {
       OneSignal.Notifications.requestPermission(true);
     }
   });
   //init code end

   //other file
   //file name : userAuthSaga
    //inside request_user_login & request_social_login & request_user_registration
    OneSignal.User.addEmail(action.payload.email);
    //inside request_log_out and  in request_user_account_delete
    //add this first
    import {select} from 'redux-saga/effects';
     const params = yield select();
     // now replace oneSignal code like
    OneSignal.User.removeEmail(
        params.user_info?.email ? params.user_info?.email : '',
      );
   ```

   9. vector icon is not visible :
      add this line in app/build.gradle => apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

   10. if your app stuck in splash screen make sure you are hiding splash screen (splash screen must be RNBootsplash )

   11. developer error in googlesignin
       => make sure you are using right keystore for release and debug. Tip: if possible then use release keystore in debug and release both just make change in app/build.gradle

   12.

   ```
   > Could not resolve all task dependencies for configuration ':app:debugCompileClasspath'.
   > Could not resolve project :react-native-camera.
     Required by:
         project :app
      > The consumer was configured to find a library for use during compile-time, preferably optimized for Android, as well as attribute 'com.android.build.api.attributes.BuildTypeAttr' with value 'debug', attribute 'com.android.build.api.attributes.AgpVersionAttr' with value '8.2.1', attribute 'org.jetbrains.kotlin.platform.type' with value 'androidJvm'. However we cannot choose between the following variants of project :react-native-camera:
          - generalDebugApiElements
          - mlkitDebugApiElements
   ```

   Solustion =>

   ```gradle
      insert the following lines in android/app/build.gradle

      android {
      ...
      defaultConfig {
         ...
         missingDimensionStrategy 'react-native-camera', 'general' <-- insert this line
      }
      }
   ```
