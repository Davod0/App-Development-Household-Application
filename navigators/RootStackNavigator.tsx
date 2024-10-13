import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";

export type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
    Register: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
    return (
        <RootStack.Navigator initialRouteName="Register">
            <RootStack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    headerTitle: () => (
                        <View style={s.titleContainer}>
                            <Text style={s.title}>Registrera dig</Text>
                        </View>
                    )
                }}
            />
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation }) => ({
                    headerTitle: () => (
                        <View style={s.titleContainer}>
                            <Text style={s.title}>Profile</Text>
                            <IconButton
                                icon="account-edit-outline"
                                size={24}
                                // TODO: change route to edit-profile
                                onPress={() => navigation.navigate("Home")}
                            />
                        </View>
                    ),
                    headerRight: () => (
                        <Button
                            mode="contained"
                            // TODO: change route to logout? add confirmation?
                            onPress={() => navigation.navigate("Home")}
                        >
                            Logout
                        </Button>
                    ),
                })}
            />
        </RootStack.Navigator>
    );
}

const s = StyleSheet.create({
    titleContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
    },
});
