import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState } from "react/cjs/react.development";

import WhiteCheck from "../../assets/Pictures/CheckMark.png";

function Checkbox(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.pressCheck();
      }}
    >
      <Image
        style={styles.CheckboxBody}
        source={props.checked ? WhiteCheck : null}
      ></Image>
    </TouchableOpacity>
  );
}

export default Checkbox;

const styles = StyleSheet.create({
  CheckboxBody: {
    height: 25,
    width: 25,
    backgroundColor: "white",
    borderRadius: 5,
    margin: 10,
  },
});
