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

import SessionLoadIcon from "../SessionLoadIcon";

import Gobo from "../../assets/Pictures/GoboTest.png";

function LoadModal(props) {
  console.log(props.loadedSessions);
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

      <ScrollView
        style={styles.loadSeleteWrapper}
        contentContainerStyle={styles.loadSelectScroll}
      >
        {props.loadedSessions
          ? props.loadedSessions.map((session, index) => {
              if (session.length) {
                return (
                  <SessionLoadIcon
                    imageSource={Gobo}
                    LeaderName={"temp"}
                    SaveName={"My personalSave"}
                    key={index}
                  ></SessionLoadIcon>
                );
              }
            })
          : null}
      </ScrollView>
    </View>
  );
}

export default LoadModal;

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

  loadSeleteWrapper: {
    backgroundColor: "white",
    height: 10,
    maxHeight: "80%",
    maxWidth: "90%",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 70,
    borderRadius: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
