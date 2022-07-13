import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

function TurnTaker(props) {
  return (
    <View style={styles.TurnTakerBody}>
      <View style={styles.TurnTakerPictureContainer}>
        <Image source={props.imageSource} style={styles.TurnTakerPicture} />
      </View>

      <View style={styles.TurnTakerInfo}>
        <View style={styles.InfoLeft}>
          <Text style={styles.NameTag}>{props.name}</Text>
          <Text style={styles.Initiative}>
            {"Initiative: "}
            {props.Initiative}
          </Text>
          <Text style={styles.Bonus}>
            {props.Bonus >= 0
              ? "Bonus: +" + props.Bonus
              : "Bonus: " + props.Bonus}
          </Text>
        </View>
        <View style={styles.InfoRight}></View>
      </View>

      <TouchableOpacity onPress={() => props.RemoveFunction(props.Placement)}>
        <View style={styles.DeleteButton}>
          <Text style={styles.DeleteText}>X</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default TurnTaker;

const styles = StyleSheet.create({
  TurnTakerBody: {
    width: "100%",
    height: 100,
    backgroundColor: "#333",
    marginBottom: 20,
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    padding: 10,
  },

  TurnTakerPictureContainer: {
    width: "15%",
  },

  TurnTakerPicture: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },

  TurnTakerInfo: {
    width: "72%",
    height: "100%",
    paddingLeft: 10,
  },

  NameTag: {
    color: "white",
  },

  Initiative: {
    color: "white",
  },

  Bonus: {
    color: "white",
  },

  InfoLeft: {
    height: "100%",
  },

  InfoRight: {
    height: "100%",
  },

  DeleteButton: {
    backgroundColor: "black",
    color: "white",
    height: 35,
    width: 35,
    borderRadius: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  DeleteText: {
    color: "white",
    fontSize: 24,
  },
});
