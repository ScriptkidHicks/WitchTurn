import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    return null;
  }
};

const RetrieveData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    alert("oops, something wen't wrong");
  }
};

//I should remove this function once I'm done. This is solely so that I don't clog up memory in the mock phone as I develop
const ClearMemory = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log("We have encountered error: " + e);
  }
};

export { StoreData, RetrieveData, ClearMemory };
