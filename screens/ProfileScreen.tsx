import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ProfileScreen() {
  return (
    <View style={s.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
