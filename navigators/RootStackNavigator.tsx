import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import ProfileIconButton from '../components/ProfileIconButton';
import useSplashScreenVisibility from '../components/SplashScreenVisibility';
import CreateHouseholdScreen from '../screens/CreateHouseholdScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import DetailsScreen from '../screens/DetailsScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import HomeScreen from '../screens/HomeScreen';
import HouseholdInformationScreen from '../screens/HouseholdInformationScreen';
import JoinHouseholdScreen from '../screens/JoinHouseholdScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReduxTestScreen from '../screens/ReduxTestScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TestScreenUsingStore from '../screens/TestScreenUsingStore';
import YourHouseholdsScreen from '../screens/YourHouseholdsScreen';
import { useAppSelector } from '../store/hooks';
import { useUserAuthState } from '../store/user/hooks';
import { selectCurrentUser } from '../store/user/selectors';
import { Household } from '../types';
import SelectedHouseholdTopTabNav from './SelectedHouseholdTopTabNav';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  Register: undefined;
  TestStore: undefined;
  CreateHouseHold: undefined;
  JoinHousehold: undefined;
  Details: undefined;
  // SelectedHouseholdNav: NavigatorScreenParams<TopTabNavigatorParamList>;
  SelectedHouseholdNav: undefined;
  CreateTask: undefined;
  HouseholdInformation: { household: Household };
  YourHouseholds: undefined;
  ReduxTest: undefined;
  EditTask: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  useUserAuthState();
  const user = useAppSelector(selectCurrentUser);
  useSplashScreenVisibility();

  return (
    <RootStack.Navigator
      initialRouteName="YourHouseholds"
      screenOptions={{ headerTitleAlign: 'center' }}
    >
      {user ? (
        <>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'HouseholdName',
              headerShadowVisible: false,
              headerRight: () => <ProfileIconButton navigation={navigation} />,
            })}
          />
          <RootStack.Screen name="ReduxTest" component={ReduxTestScreen} />
          <RootStack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: 'Information om syssla' }}
          />

          <RootStack.Screen
            name="SelectedHouseholdNav"
            component={SelectedHouseholdTopTabNav}
            options={({ navigation }) => ({
              title: 'HouseholdName',
              headerShadowVisible: false,
              headerRight: () => <ProfileIconButton navigation={navigation} />,
            })}
          />

          <RootStack.Screen
            name="CreateHouseHold"
            component={CreateHouseholdScreen}
            options={{ title: 'Skapa hushåll' }}
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
            options={{ title: 'Gå med i hushåll' }}
          />
          <RootStack.Screen
            name="YourHouseholds"
            component={YourHouseholdsScreen}
            options={{ title: 'Dina hushåll' }}
          />
          <RootStack.Screen
            name="HouseholdInformation"
            component={HouseholdInformationScreen}
            options={{ title: 'Hushållsinformation' }}
          />
          <RootStack.Screen
            name="CreateTask"
            component={CreateTaskScreen}
            options={{ title: 'Skapa en ny syssla' }}
          />
          <RootStack.Screen name="EditTask" component={EditTaskScreen} />
        </>
      ) : (
        <>
          <RootStack.Screen
            name="TestStore"
            component={TestScreenUsingStore}
            options={{ title: 'Uppdatera' }}
          />
          <RootStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Logga in' }}
          />
          <RootStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Registrera dig' }}
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
