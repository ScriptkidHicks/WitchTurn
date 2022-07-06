import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.introTitle}>Witch Turn</Text>
      <TouchableOpacity style={styles.openButton}>
        <Text style={styles.openText}>Begin Tracking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  introTitle: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 30,
  },
  openText: {
    color: "black",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});
