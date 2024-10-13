import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";

type rootStackParamList = {
    Home: undefined;
    Register: undefined;
}

const rootStack = createNativeStackNavigator<rootStackParamList>();

export default function RootStackNavigator() {
    return (
        < rootStack.Navigator >
            <rootStack.Screen name="Register" component={RegisterScreen} options={{ title: "Registrera dig" }}></rootStack.Screen>
            <rootStack.Screen name="Home" component={HomeScreen}></rootStack.Screen>
        </rootStack.Navigator >
    );
}