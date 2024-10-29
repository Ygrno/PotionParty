import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
// import { useState } from "react";

export default function App() {
  // const a: Player = new Player("Player 1");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
