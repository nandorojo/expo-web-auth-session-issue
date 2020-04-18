## 🐛 Bug Report

Calling `AuthSession.getRedirectUrl()` on web (with Next.js) throws an error.

### Environment

```
  Expo CLI 3.18.4 environment info:
    System:
      OS: macOS 10.15.2
      Shell: 3.2.57 - /bin/bash
    Binaries:
      Node: 12.13.1 - /usr/local/bin/node
      Yarn: 1.21.1 - /usr/local/bin/yarn
      npm: 6.12.1 - /usr/local/bin/npm
      Watchman: 4.9.0 - /usr/local/bin/watchman
    IDEs:
      Xcode: 11.3/11C29 - /usr/bin/xcodebuild
    npmPackages:
      expo: ~37.0.3 => 37.0.7
      react: ~16.9.0 => 16.9.0
      react-native: https://github.com/expo/react-native/archive/sdk-37.0.1.tar.gz => 0.61.4
    npmGlobalPackages:
      expo-cli: 3.18.4
```

Using Expo web with Next.js (😍)

### Steps to Reproduce

1. **Create a [nextjs project with expo](https://docs.expo.io/versions/latest/guides/using-nextjs/)**

- Init: `expo init`
- Install: `yarn add -D @expo/next-adapter`
- Configure: `yarn next-expo`

2. `yarn add expo-auth-session`
3. In `pages/index.js`:

```jsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as AuthSession from "expo-auth-session";

export default function App() {
  const onPress = () => {
    console.log("will get url");
    const redirectUrl = AuthSession.getRedirectUrl(); // 🚨error here
    console.log({ redirectUrl });
  };

  return (
    <View style={styles.container}>
      <Text onPress={onPress} style={styles.text}>
        Start Auth Session
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    padding: 40,
  },
});
```

4. `yarn next dev`, and open `localhost:3000`

5. Click the text.

### Expected Behavior

`getRedirectUrl` should return a string.

### Actual Behavior

The function throws an error.
<img width="1009" alt="Screen Shot 2020-04-18 at 2 56 07 PM" src="https://user-images.githubusercontent.com/13172299/79668722-d0627100-8184-11ea-872f-6f338dfc654d.png">

This is from the browser logs:

```js
TypeError: Cannot read property 'startsWith' of undefined
    at Function.warnIfAnonymous (ManagedSessionUrlProvider.ts:109)
    at ManagedSessionUrlProvider.getRedirectUrl (ManagedSessionUrlProvider.ts:83)
    at Module.getRedirectUrl (AuthSession.ts:77)
    at _callee$ (use-spotify-auth.ts:1)
    at tryCatch (runtime.js:45)
    at Generator.invoke [as _invoke] (runtime.js:274)
    at Generator.prototype.<computed> [as next] (runtime.js:97)
    at tryCatch (runtime.js:45)
    at invoke (runtime.js:135)
    at runtime.js:170
    at new Promise (<anonymous>)
    at callInvokeWithMethodAndArg (runtime.js:169)
    at AsyncIterator.enqueue [as _invoke] (runtime.js:192)
    at AsyncIterator.prototype.<computed> [as next] (runtime.js:97)
    at Object.push../node_modules/regenerator-runtime/runtime.js.exports.async (runtime.js:219)
    at _callee (use-spotify-auth.ts:1)
    at _callee$ (Authenticate-Spotify.tsx:1)
    at tryCatch (runtime.js:45)
    at Generator.invoke [as _invoke] (runtime.js:274)
    at Generator.prototype.<computed> [as next] (runtime.js:97)
    at tryCatch (runtime.js:45)
    at invoke (runtime.js:135)
    at runtime.js:170
    at new Promise (<anonymous>)
    at callInvokeWithMethodAndArg (runtime.js:169)
    at AsyncIterator.enqueue [as _invoke] (runtime.js:192)
    at AsyncIterator.prototype.<computed> [as next] (runtime.js:97)
    at Object.push../node_modules/regenerator-runtime/runtime.js.exports.async (runtime.js:219)
    at Object._callee [as onPress] (Authenticate-Spotify.tsx:1)
    at Object.touchableHandlePress (index.js:117)
    at Object._performSideEffectsForTransition (index.js:730)
    at Object._receiveSignal (index.js:642)
    at Object.touchableHandleResponderRelease (index.js:428)
    at domProps.<computed> (index.js:65)
    at HTMLUnknownElement.callCallback (react-dom.development.js:347)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:397)
    at invokeGuardedCallback (react-dom.development.js:454)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:468)
    at executeDispatch (react-dom.development.js:600)
    at executeDispatchesInOrder (react-dom.development.js:622)
    at executeDispatchesAndRelease (react-dom.development.js:725)
    at executeDispatchesAndReleaseTopLevel (react-dom.development.js:733)
    at Array.forEach (<anonymous>)
    at forEachAccumulated (react-dom.development.js:705)
    at runEventsInBatch (react-dom.development.js:750)
    at runExtractedPluginEventsInBatch (react-dom.development.js:881)
    at handleTopLevel (react-dom.development.js:5901)
    at batchedEventUpdates (react-dom.development.js:2344)
    at dispatchEventForPluginEventSystem (react-dom.development.js:5996)
    at dispatchEvent (react-dom.development.js:6025)
```

### Reproducible Demo

https://github.com/nandorojo/expo-web-auth-session-issue

```sh
git clone https://github.com/nandorojo/expo-web-auth-session-issue
cd expo-web-auth-session-issue
yarn
yarn next dev
# open locahost:3000
```

<!--
  Please share a project that reproduces the issue.
  There are two ways to do it:

    * Create a new app using https://snack.expo.io/ and try to reproduce the issue in it.
      This is useful if you roughly know where the problem is, or can’t share the real code.

    * Or, copy your app and remove things until you’re left with the minimal reproducible demo.
      This is useful for finding the root cause. You may then optionally create a Snack.

  This is a good guide to creating bug demos: https://stackoverflow.com/help/mcve
  Once you’re done, copy and paste the link to the Snack or a public GitHub repository below.

  (Even if your issue can only be reproduced in a standalone app, please include a Snack
  or GitHub repo we can use to build a standalone app!)
-->

<!--
  What happens if you skip this step?

  Someone will read your bug report, and maybe will be able to help you,
  but it’s unlikely that it will get much attention from the team. Eventually,
  the issue will likely get closed in favor of issues that have reproducible demos.

  Please remember that:

    * Issues without reproducible demos have a very low priority.
    * The person fixing the bug would have to do that anyway. Please be respectful of their time.
    * You might figure out the issues yourself as you work on extracting it.

  Thanks for helping us help you!
-->
