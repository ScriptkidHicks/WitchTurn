import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Gobo from "./assets/Pictures/GoboTest.png";
import CustomButtonImage from "./assets/Pictures/customButton.png";

import CustomModal from "./Components/Modals/CustomModal";

import TurnTaker from "./Components/TurnTaker";

export default function App() {
  const [turnTakersList, setTurnTakersList] = useState([
    {
      name: "Persephone",
      Initiative: 12,
      imageSource: Gobo,
      Bonus: 1,
    },
    {
      name: "Kyle",
      Initiative: 13,
      imageSource: Gobo,
      Bonus: 1,
    },
    {
      name: "pam",
      Initiative: 1,
      imageSource: Gobo,
      Bonus: 1,
    },
    {
      name: "Nick",
      Initiative: 2,
      imageSource: Gobo,
      Bonus: 1,
    },
  ]);

  const [customModalVisible, setCustomModalVisible] = useState(false);

  function SortList(toBeSorted) {
    toBeSorted.sort((a, b) => {
      return a.Initiative == b.Initiative
        ? b.Bonus - a.Bonus
        : b.Initiative - a.Initiative;
    });
  }

  function AddParticipant(name, initiative, bonus) {
    let partipants = [...turnTakersList];
    let headOfList = partipants[0];
    partipants.push({
      name: name,
      Initiative: initiative,
      Bonus: bonus,
      imageSource: Gobo,
    });
    SortList(partipants);
    let offset = partipants.findIndex((obj) => {
      return obj === headOfList;
    });
    console.log(partipants.slice(0, offset));
    console.log(partipants.slice(offset, partipants.length));
    partipants = [
      ...partipants.slice(offset, partipants.length),
      ...partipants.slice(0, offset),
    ];
    setTurnTakersList(partipants);
  }

  function RemoveParticipant(participantIndex) {
    let participants = [...turnTakersList];
    participants.splice(participantIndex, 1);
    setTurnTakersList(participants);
  }

  function advanceTurn() {
    let participants = [...turnTakersList];

    if (participants.length === 0) {
      return;
    }
    let temp = participants[0];
    participants.splice(0, 1);
    participants.push(temp);

    setTurnTakersList(participants);
  }

  function reduceTurn() {
    let participants = [...turnTakersList];

    if (participants.length === 0) {
      return;
    }
    let temp = participants.pop();
    participants = [temp, ...participants];
    setTurnTakersList(participants);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.TitleBar}>Witch Turn</Text>
      <ScrollView style={styles.TurnContainer}>
        {turnTakersList.map((character, index) => {
          return (
            <TurnTaker
              name={character.name}
              imageSource={character.imageSource}
              Initiative={character.Initiative}
              Bonus={character.Bonus}
              Placement={index}
              RemoveFunction={RemoveParticipant}
              key={(character.Initiative, character.nameTag, index)}
            />
          );
        })}
      </ScrollView>
      <View style={styles.turnMoveContainer}>
        <TouchableOpacity onPress={() => reduceTurn()}>
          <View style={styles.advanceButton}>
            <Text> {"<"} </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => advanceTurn()}>
          <View style={styles.advanceButton}>
            <Text> {">"} </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          onPress={() => {
            let participants = [...turnTakersList];
            SortList(participants);
            setTurnTakersList(participants);
          }}
        >
          <View style={styles.addButton}>
            <Text>T</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            let participants = [...turnTakersList];
            let temp = participants[0];
            SortList(participants);
            console.log(
              participants.findIndex((obj) => {
                return obj === temp;
              })
            );
            setTurnTakersList(participants);
          }}
        >
          <View style={styles.addButton}>
            <Text>B</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCustomModalVisible(true)}>
          <View>
            <Image source={CustomButtonImage} style={styles.addButton} />
          </View>
        </TouchableOpacity>
      </View>
      {customModalVisible && (
        <CustomModal
          deactivate={setCustomModalVisible}
          AddParticipant={AddParticipant}
        />
      )}
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
    maxHeight: "60%",
    borderRadius: 30,
  },

  turnMoveContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
    marginTop: 15,
    backgroundColor: "#a11",
    borderRadius: 20,
    padding: 8,
  },

  advanceButton: {
    backgroundColor: "white",
    height: 60,
    width: 60,
    textAlign: "center",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomButtons: {
    backgroundColor: "green",
    width: "100%",
    height: 60,
    position: "absolute",
    bottom: 20,
    borderRadius: 25,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  addButton: {
    height: 60,
    width: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
