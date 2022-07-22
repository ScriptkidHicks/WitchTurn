import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

function CustomModal(props) {
  const [name, setName] = useState(null);
  const [bonus, setBonus] = useState("0");
  const [initiative, setInitiative] = useState("0");

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
    height: 300,
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
});
