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
