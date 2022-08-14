import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    alert("oops, we didn't store that");
  }
};

const RetrieveData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log("unparsed this is " + jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    alert("oops, something wen't wrong");
  }
};

export { StoreData, RetrieveData };
