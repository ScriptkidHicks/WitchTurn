import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { useState } from "react/cjs/react.development";

function SaveModal(props) {
  const [saveName, setSaveName] = useState(null);
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
      <View style={styles.SaveWrapper}>
        <Text style={styles.HeaderText}>Save Session</Text>
        {props.saveAvailable && (
          <TextInput
            style={styles.SessionTextInput}
            placeholder="Session Save Title"
            value={saveName}
            onChangeText={(text) => {
              setSaveName(text);
            }}
          ></TextInput>
        )}
        {props.saveAvailable && (
          <TouchableOpacity
            onPress={() => {
              props.saveFunction(saveName);
            }}
          >
            <Text style={styles.SaveButton}>Save</Text>
          </TouchableOpacity>
        )}
        {!props.saveAvailable && (
          <Text style={styles.ApologyText}>
            You have 10 sessions saved. Please delete some before saving more.
          </Text>
        )}
      </View>
      <KeyboardAvoidingView></KeyboardAvoidingView>
    </View>
  );
}

export default SaveModal;

const styles = StyleSheet.create({
  interfaceBody: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: "absolute",
    bottom: 20,
    borderRadius: 30,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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

  SaveWrapper: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "90%",
    borderRadius: 30,
    alignItems: "center",
    padding: 20,
    justifyContent: "flex-start",
  },

  HeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 40,
  },

  SessionTextInput: {
    width: "90%",
    borderRadius: 20,
    backgroundColor: "rgb(150, 150, 150)",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    textAlign: "center",
    color: "white",
  },

  SaveButton: {
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
  },

  ApologyText: {
    textAlign: "center",
    lineHeight: 30,
  },
});
