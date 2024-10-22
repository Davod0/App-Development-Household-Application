import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { Household } from '../data';
import CreateHouseholdScreen from '../screens/CreateHouseholdScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import HomeScreen from '../screens/HomeScreen';
import HouseholdInformationScreen from '../screens/HouseholdInformationScreen';
import JoinHouseholdScreen from '../screens/JoinHouseholdScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TestScreenUsingStore from '../screens/TestScreenUsingStore';
import YourHouseholdsScreen from '../screens/YourHouseholdsScreen';
import { useAppSelector } from '../store/hooks';
import { useUserAuthState } from '../store/user/hooks';
import { selectCurrentUser } from '../store/user/selectors';
import SelectedHouseholdTopTabNav from './SelectedHouseholdTopTabNav';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  Register: undefined;
  TestStore: undefined;
  CreateHouseHold: undefined;
  JoinHousehold: undefined;
  // SelectedHouseholdNav: NavigatorScreenParams<TopTabNavigatorParamList>;
  SelectedHouseholdNav: undefined;
  CreateTask: undefined;
  HouseholdInformation: { household: Household };
  YourHouseholds: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  useUserAuthState();
  const user = useAppSelector(selectCurrentUser);

  return (
    <RootStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerTitleAlign: 'center' }}
    >
      {user ? (
        <>
          <RootStack.Screen name="Home" component={HomeScreen} />

          <RootStack.Screen
            name="SelectedHouseholdNav"
            component={SelectedHouseholdTopTabNav}
            options={({ navigation }) => ({
              title: 'HouseholdName',
              headerShadowVisible: false,
              headerRight: () => (
                <IconButton
                  icon="account-outline"
                  size={24}
                  onPress={() => navigation.navigate('Profile')}
                />
              ),
            })}
          />

          <RootStack.Screen
            name="CreateHouseHold"
            component={CreateHouseholdScreen}
            options={{
              headerTitle: () => (
                <View style={s.titleContainer}>
                  <Text style={s.title}>Skapa hushåll</Text>
                </View>
              ),
            }}
          />
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
                    onPress={() => navigation.navigate('Home')}
                  />
                </View>
              ),
              headerRight: () => (
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('Home')}
                >
                  Logout
                </Button>
              ),
            })}
          />
          <RootStack.Screen
            name="JoinHousehold"
            component={JoinHouseholdScreen}
            options={{
              headerTitle: () => (
                <View style={s.titleContainer}>
                  <Text style={s.title}>Gå med i hushåll</Text>
                </View>
              ),
            }}
          />
          <RootStack.Screen
            name="YourHouseholds"
            component={YourHouseholdsScreen}
            options={{
              headerTitle: () => (
                <View style={s.titleContainer}>
                  <Text style={s.title}>Dina hushåll</Text>
                </View>
              ),
            }}
          />
          <RootStack.Screen
            name="HouseholdInformation"
            component={HouseholdInformationScreen}
            options={{
              headerTitle: () => (
                <View style={s.titleContainer}>
                  <Text style={s.title}>Hushållsinformation</Text>
                </View>
              ),
            }}
          />
          <RootStack.Screen
            name="CreateTask"
            component={CreateTaskScreen}
            options={{
              headerTitle: () => (
                <View style={s.titleContainer}>
                  <Text style={s.title}>Skapa en ny syssla</Text>
                </View>
              ),
            }}
          />
        </>
      ) : (
        <>
          <RootStack.Screen name="TestStore" component={TestScreenUsingStore} />
          <RootStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: () => (
                <View style={s.titleContainer}>
                  <Text style={s.title}>Logga in</Text>
                </View>
              ),
            }}
          />
          <RootStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerTitle: () => (
                <View>
                  <Text style={s.title}>Registrera dig</Text>
                </View>
              ),
            }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
}

const s = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});
