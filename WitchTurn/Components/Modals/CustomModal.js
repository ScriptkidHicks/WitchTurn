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
import Wizard from "../../assets/Pictures/Wizard.png";

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
          <ScrollView>
            {characterImageList.map((image, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    pickImage(image);
                  }}
                >
                  <Image
                    ley={index}
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
          onChangeText={(text) => setName(text)}
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
          props.AddParticipant(name, initiative, bonus);
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
  },
});
