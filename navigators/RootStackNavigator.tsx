import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestScreenUsingStore from "../screens/TestScreenUsingStore";

type rootStackParamList = {
  Home: undefined;
};

const rootStack = createNativeStackNavigator<rootStackParamList>();

export default function RootStackNavigator() {
  return (
    <rootStack.Navigator>
      <rootStack.Screen
        name="Home"
        component={TestScreenUsingStore}
      ></rootStack.Screen>
    </rootStack.Navigator>
  );
}
