import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

type rootStackParamList = {
    Home: undefined;
}

const rootStack = createNativeStackNavigator<rootStackParamList>();

export default function RootStackNavigator() {
    return (
        < rootStack.Navigator >
            <rootStack.Screen name="Home" component={HomeScreen}></rootStack.Screen>
        </rootStack.Navigator >
    );
}