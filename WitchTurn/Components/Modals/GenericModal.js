import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Gobo from "../../assets/Pictures/GoboTest.png";

import GenericInsert from "../GenericInsert";

function GenericModal(props) {
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
        style={styles.genericSelector}
        alwaysBounceVertical={true}
        bounces={true}
        centerContent={true}
        contentContainerStyle={styles.scrollStyles}
      >
        <GenericInsert
          ImageSource={Gobo}
          Name={"Gobo"}
          Bonus={3}
        ></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
        <GenericInsert></GenericInsert>
      </ScrollView>
    </View>
  );
}

export default GenericModal;

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

  genericSelector: {
    backgroundColor: "rgba(30,30,30,0.8)",
    width: "90%",
    maxHeight: "85%",
    borderRadius: 30,
    marginTop: 70,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "column",
    overflow: "hidden",
  },
});
