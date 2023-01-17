import * as React from "react";

import { StyleSheet, View, Button } from "react-native";
import * as Speech from "expo-speech";

export default function App() {
  const speak = () => {
    const thingToSay = "qualquer coisa teste";
    Speech.speak(thingToSay);
  };

  return (
    <View style={styles.container}>
      <Button title="Pressione para ouvir algumas palavras" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
