import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  AndroidSafeArea: {
    backgroundColor: "white",
    marginTop: 5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});