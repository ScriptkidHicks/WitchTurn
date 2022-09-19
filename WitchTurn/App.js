import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  StoreData,
  RetrieveData,
  ClearMemory,
} from "./StorageManagement/Storage";

import CustomModal from "./Components/Modals/CustomModal";
import GenericModal from "./Components/Modals/GenericModal";
import LoadModal from "./Components/Modals/LoadModal";
import SaveModal from "./Components/Modals/SaveModal";

import TurnTaker from "./Components/TurnTaker";

import RandomNames from "./Components/RandomNames";

export default function App() {
  const [turnTakersList, setTurnTakersList] = useState([]);

  const [loadedSessions, setLoadedSessions] = useState([]);

  const [offset, setOffset] = useState(0);

  const [saveAvailable, setSaveAvailable] = useState(true);

  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [genericModalVisible, setGenericModalVisible] = useState(false);
  const [loadModalVisible, setLoadModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  const [namesList, setNamesList] = useState([]);

  const SavedSessions = "SavedSessions";

  function SortList(toBeSorted) {
    toBeSorted.sort((a, b) => {
      return a.Initiative == b.Initiative
        ? b.Bonus - a.Bonus
        : b.Initiative - a.Initiative;
    });
  }

  function PrintExample(word) {
    console.log("The word is ", word);
  }

  function AddParticipant(name, initiative, bonus, characterImage) {
    let tempName = name == "" || name == null ? RandomNames[0] : name;
    let nameObject = namesList.find((item) => item.name === tempName);
    let realName;
    if (bonus === undefined) {
      bonus = 0;
    }
    if (initiative === undefined) {
      //It's important to have it be +1 instead of 20, because this keeps it from being 0 initiative.
      initiative = Math.floor(Math.random() * 19 + 1) + Number(bonus);
    }
    if (nameObject) {
      nameObject.count++;
      realName = tempName + " (" + nameObject.count + ")";
    } else {
      realName = tempName;
      let names = [...namesList, { name: realName, count: 1 }];
      setNamesList(names);
    }
    let partipants = [...turnTakersList];
    let newParticipant = {
      name: realName,
      Initiative: initiative,
      Bonus: bonus,
      imageSource: characterImage,
      checked: false,
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

  function updateReactions(participantIndex) {
    let participants = [...turnTakersList];
    participants[participantIndex].checked =
      !participants[participantIndex].checked;
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

    let newOffset = 0;
    if (offset >= participants.length) {
      newOffset = offset + 1;
    }
    setOffset(newOffset);
    if (participants.length) {
      participants[0].checked = false;
    }
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

    let newOffset = 0;
    if (offset == 0) {
      newOffset = participants.length - 1;
    } else {
      newOffset = offset - 1;
    }
    setOffset(newOffset);
  }

  async function LoadSessions() {
    const sessions = await RetrieveData(SavedSessions);
    if (sessions) {
      setLoadedSessions(sessions);
    }
  }

  async function LoadLoadModal() {
    await LoadSessions();
    setLoadModalVisible(true);
  }

  async function LoadSaveModal() {
    await LoadSessions();
    console.log("load save modal loaded sessions");
    console.log(loadedSessions);
    console.log("Loaded sessions length: " + loadedSessions.length);
    await setSaveAvailable(loadedSessions.length < 10);
    setSaveModalVisible(true);
  }

  async function SaveSession(SessionTitle) {
    if (SessionTitle === undefined || SessionTitle === null) {
      console.log(SessionTitle);
      return false;
    }
    console.log("Session title: " + SessionTitle);
    let sessions = await RetrieveData(SavedSessions);
    if (sessions === null) {
      sessions = [];
    }
    let participants = [...turnTakersList];
    console.log("participants: " + participants);
    if (participants.length == 0) {
      console.log("there were no participants");
      return false;
    }
    let sessionSaveObject = {
      title: SessionTitle,
      participants: participants,
    };
    sessions.push(sessionSaveObject);
    await StoreData(SavedSessions, sessions);
    LoadSessions();
    setSaveModalVisible(false);
    return true;
  }

  async function DeleteSavedSession(index) {
    let sessions = [...loadedSessions];
    sessions.splice(index, 1);
    await StoreData(SavedSessions, sessions);
    await LoadSessions();
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
              pressCheck={() => {
                updateReactions(index);
              }}
              checked={character.checked}
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
            LoadSaveModal();
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
        <TouchableOpacity onPress={() => ClearMemory()}>
          <View style={styles.addButton}>
            <Text>Clear</Text>
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
        <LoadModal
          loadedSessions={loadedSessions}
          deactivate={setLoadModalVisible}
          Add={AddParticipant}
          LoadSession={setTurnTakersList}
          DeleteFunction={DeleteSavedSession}
        />
      )}
      {saveModalVisible && (
        <SaveModal
          deactivate={setSaveModalVisible}
          saveFunction={SaveSession}
          saveAvailable={saveAvailable}
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
