import { TouchableOpacity, StyleSheet, View, Image } from "react-native";

function GenericInsert(props) {
  return (
    <TouchableOpacity>
      <View style={styles.genericInsertBody}>
        <Image source={props.ImageSource} />
      </View>
    </TouchableOpacity>
  );
}

export default GenericInsert;

const styles = StyleSheet.create({
  genericInsertBody: {
    backgroundColor: "rgb(200,200,200)",
    width: "100%",
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  genericPicture: {
    maxHeight: "100%",
  },
});
