import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { StoreData, RetrieveData } from "./StorageManagement/Storage";

import CustomModal from "./Components/Modals/CustomModal";
import GenericModal from "./Components/Modals/GenericModal";
import LoadModal from "./Components/Modals/LoadModal";

import TurnTaker from "./Components/TurnTaker";

export default function App() {
  const [turnTakersList, setTurnTakersList] = useState([]);

  const [loadedSessions, setLoadedSessions] = useState([]);

  const [offset, setOffset] = useState(0);

  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [genericModalVisible, setGenericModalVisible] = useState(false);
  const [loadModalVisible, setLoadModalVisible] = useState(false);

  const [namesList, setNamesList] = useState([]);

  const SavedSessions = "SavedSessions";

  function SortList(toBeSorted) {
    toBeSorted.sort((a, b) => {
      return a.Initiative == b.Initiative
        ? b.Bonus - a.Bonus
        : b.Initiative - a.Initiative;
    });
  }

  function AddParticipant(name, initiative, bonus, characterImage) {
    let nameObject = namesList.find((item) => item.name === name);
    let realName = name;
    if (bonus === undefined) {
      bonus = 0;
    }
    if (initiative === undefined) {
      initiative = Math.floor(Math.random() * 20) + bonus;
    }
    if (nameObject) {
      nameObject.count++;
      realName = name + " (" + nameObject.count + ")";
    } else {
      let names = [...namesList, { name: realName, count: 1 }];
      setNamesList(names);
    }
    let partipants = [...turnTakersList];
    let newParticipant = {
      name: realName,
      Initiative: initiative,
      Bonus: bonus,
      imageSource: characterImage,
    };
    partipants.push(newParticipant);
    SortList(partipants);
    let insertedIndex = partipants.findIndex((obj) => {
      return obj === newParticipant;
    });

    if (insertedIndex > partipants.length - 1 - offset) {
      setOffset(offset + 1);
    }

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
    if (participantIndex < offset) {
      setOffset(offset - 1);
    }
    if (offset >= participants.length) {
      setOffset(0);
    }
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
    let newOffset = 0;
    if (offset >= participants.length) {
      newOffset = offset + 1;
    }
    setOffset(newOffset);
  }

  function reduceTurn() {
    let participants = [...turnTakersList];

    if (participants.length === 0) {
      return;
    }
    let temp = participants.pop();
    participants = [temp, ...participants];
    setTurnTakersList(participants);

    let newOffset = 0;
    if (offset == 0) {
      newOffset = participants.length - 1;
    } else {
      newOffset = offset - 1;
    }
    setOffset(newOffset);
  }

  async function LoadLoadModal() {
    const sessions = await RetrieveData(SavedSessions);
    await setLoadedSessions(sessions);
    setLoadModalVisible(true);
  }

  async function SaveSession(ParticipantList) {
    let sessions = await RetrieveData(SavedSessions);
    if (sessions === null) {
      sessions = [];
    }
    sessions.push(turnTakersList);
    StoreData(SavedSessions, sessions);
  }

  async function LoadSessions() {
    let retrievedData = await RetrieveData(SavedSessions);
    console.log(retrievedData);
    if (retrievedData == null) {
      retrievedData = [];
    }
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
            SaveSession(turnTakersList);
          }}
        >
          <View style={styles.addButton}>
            <Text>Save</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            LoadLoadModal();
          }}
        >
          <View style={styles.addButton}>
            <Text>Load</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setGenericModalVisible(true);
          }}
        >
          <View style={styles.addButton}>
            <Text>Generic</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCustomModalVisible(true)}>
          <View style={styles.addButton}>
            <Text>Custom</Text>
          </View>
        </TouchableOpacity>
      </View>
      {customModalVisible && (
        <CustomModal
          deactivate={setCustomModalVisible}
          AddParticipant={AddParticipant}
        />
      )}
      {genericModalVisible && (
        <GenericModal
          deactivate={setGenericModalVisible}
          Add={AddParticipant}
        />
      )}
      {loadModalVisible && (
        <LoadModal deactivate={setLoadModalVisible} Add={AddParticipant} />
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
