import { TouchableOpacity, StyleSheet, View, Image, Text } from "react-native";

function GenericInsert(props) {
  return (
    <TouchableOpacity>
      <View style={styles.genericInsertBody}>
        <Image style={styles.genericPicture} source={props.ImageSource} />
        <View style={styles.nameAndinfo}>
          <Text style={styles.info}>Name: {props.Name}</Text>
          <Text style={styles.info}>Bonus: {props.Bonus}</Text>
        </View>
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
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  nameAndinfo: {
    width: "70%",
    backgroundColor: "black",
    borderRadius: 10,
    padding: 5,
  },

  info: {
    color: "white",
  },
});
