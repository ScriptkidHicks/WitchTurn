import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

import Unknown from "../../assets/Pictures/UnknownSoldier.png";

import RandomNames from "../RandomNames";

import { characterImageList } from "../../assets/CharacterImages";

function CustomModal(props) {
  const [name, setName] = useState(null);
  const [bonus, setBonus] = useState();
  const [initiative, setInitiative] = useState();
  const [characterImage, setCharacterImage] = useState(Unknown);
  const [modalOpen, setModalOpen] = useState(false);

  function pickImage(imageChoice) {
    setCharacterImage(imageChoice);
    setModalOpen(false);
  }

  return (
    <View style={styles.interfaceBody}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          props.deactivate(false);
        }}
      >
        <Text>X</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardWrapper}
      >
        {!modalOpen && (
          <TouchableOpacity
            onPress={() => {
              setModalOpen(true);
            }}
          >
            <Image source={characterImage} style={styles.characterImage} />
          </TouchableOpacity>
        )}
        {modalOpen && (
          <ScrollView
            horizontal={true}
            indicatorStyle="white"
            snapToInterval={3}
            endFillColor={"red"}
            style={styles.imageSelect}
            contentContainerStyle={styles.imageSelectContainer}
          >
            {characterImageList.map((image, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    pickImage(image);
                  }}
                >
                  <Image
                    key={index}
                    style={styles.characterImage}
                    source={image}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
        <TextInput
          style={styles.nameInput}
          placeholder="Name"
          value={name}
          onChangeText={(text) => {
            console.log("The name being placed is: " + text);
            setName(text == "" || text == null ? RandomNames[0] : text);
          }}
        ></TextInput>
        <TextInput
          style={styles.nameInput}
          placeholder="Initiative"
          value={initiative}
          onChangeText={(text) => setInitiative(text)}
        ></TextInput>
        <TextInput
          style={styles.nameInput}
          placeholder="Bonus"
          value={bonus}
          onChangeText={(text) => setBonus(text)}
        ></TextInput>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() => {
          props.AddParticipant(name, initiative, bonus, characterImage);
          props.deactivate(false);
        }}
      >
        <Text style={styles.customInsertText}>Insert Custom</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CustomModal;

const styles = StyleSheet.create({
  interfaceBody: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: "absolute",
    bottom: 20,
    borderRadius: 30,
    width: "100%",
    height: "100%",
  },

  closeButton: {
    height: 30,
    width: 30,
    backgroundColor: "white",
    borderRadius: 30,
    position: "absolute",
    top: 20,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  keyboardWrapper: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
  },

  nameInput: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 60,
    textAlign: "center",
    marginBottom: 20,
  },

  customInsertText: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 40,
    textAlign: "center",
    marginTop: 30,
  },

  characterImage: {
    height: 60,
    width: 60,
    borderRadius: 10,
    margin: 5,
  },

  imageSelect: {
    maxHeight: 140,
    width: "100%",
  },

  imageSelectContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
