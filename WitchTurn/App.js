import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Gobo from "./assets/Pictures/GoboTest.png";

import TurnTaker from "./Components/TurnTaker";

export default function App() {
  const [turnTakersList, setTurnTakersList] = useState([
    {
      name: "Persephone",
      Initiative: 12,
      imageSource: Gobo,
      Bonus: 1,
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.TitleBar}>Witch Turn</Text>
      <View style={styles.TurnContainer}>
        {turnTakersList.map((character, index) => {
          return (
            <TurnTaker
              name={character.name}
              imageSource={character.imageSource}
              Initiative={character.Initiative}
              Bonus={character.Bonus}
              key={(character.Initiative, character.nameTag)}
            />
          );
        })}
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 60,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },

  TitleBar: {
    width: "100%",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 24,
    paddingBottom: 20,
  },

  TurnContainer: {
    backgroundColor: "#1f1f1f",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
