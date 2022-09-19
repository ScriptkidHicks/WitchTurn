import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

function SessionLoadIcon(props) {
  return (
    <View style={styles.iconBody} centerContent={true}>
      <View style={styles.InformationDiv}>
        <Image source={props.imageSource} style={styles.genericPicture} />
        <Text style={styles.infoText}>First: {props.LeaderName}</Text>
        <Text style={styles.infoText}>{props.SaveName}</Text>
      </View>
      <View style={styles.buttonsDiv}>
        <TouchableOpacity
          onPress={() => {
            props.LoadSession(props.session);
          }}
        >
          <Text style={styles.actionButton}>Load</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.DeleteFunction(props.key);
          }}
        >
          <Text style={styles.actionButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SessionLoadIcon;

const styles = StyleSheet.create({
  iconBody: {
    width: "100%",
    height: 200,
    backgroundColor: "black",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
  },

  buttonsDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    width: "30%",
    height: "100%",
  },

  InformationDiv: {
    width: "70%",
    height: "100%",
    padding: 20,
    paddingLeft: 40,
    justifyContent: "space-between",
  },

  actionButton: {
    padding: 10,
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 20,
  },

  genericPicture: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },

  infoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
