import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signOut } from 'firebase/auth';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import ArchivedTask from '../components/ArchiveTask';
import ProfileIconButton from '../components/ProfileIconButton';
import useSplashScreenVisibility from '../components/SplashScreenVisibility';
import { auth } from '../firebase';
import CreateHouseholdScreen from '../screens/CreateHouseholdScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import HomeScreen from '../screens/debug/HomeScreen';
import ReduxTestScreen from '../screens/debug/ReduxTestScreen';
import TestCompTasks from '../screens/debug/TestCompTasks';
import TestHouseholds from '../screens/debug/TestHouseholds';
import TestMembers from '../screens/debug/TestMembers';
import TestRequests from '../screens/debug/TestRequests';
import TestTasks from '../screens/debug/TestTasks';
import TestUser from '../screens/debug/TestUser';
import DetailsScreen from '../screens/DetailsScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import HouseholdInformationScreen from '../screens/HouseholdInformationScreen';
import JoinHouseholdScreen from '../screens/JoinHouseholdScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import YourHouseholdsScreen from '../screens/YourHouseholdsScreen';
import { useAppSelector } from '../store/hooks';
import { useUserAuthState } from '../store/user/hooks';
import {
  selectCurrentUser,
  selectSelectedHousehold,
} from '../store/user/userSelectors';
import { Household, Task } from '../types';
import SelectedHouseholdTopTabNav from './SelectedHouseholdTopTabNav';

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  Profile: undefined;
  SignUp: undefined;
  CreateHouseHold: undefined;
  JoinHousehold: undefined;
  Details: undefined;
  SelectedHouseholdNav: undefined;
  CreateTask: undefined;
  HouseholdInformation: { household: Household };
  YourHouseholds: undefined;
  ReduxTest: undefined;
  TestUser: undefined;
  TestTasks: undefined;
  TestMembers: undefined;
  TestHouseholds: undefined;
  TestCompTasks: undefined;
  EditTask: { task: Task };
  TestRequests: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  useUserAuthState();
  useSplashScreenVisibility();
  const user = useAppSelector(selectCurrentUser);
  const selectedHousehold = useAppSelector(selectSelectedHousehold);

  return (
    <RootStack.Navigator
      initialRouteName="Home"
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
          <RootStack.Screen name="TestUser" component={TestUser} />
          <RootStack.Screen name="TestTasks" component={TestTasks} />
          <RootStack.Screen name="TestMembers" component={TestMembers} />
          <RootStack.Screen name="TestHouseholds" component={TestHouseholds} />
          <RootStack.Screen name="TestCompTasks" component={TestCompTasks} />
          <RootStack.Screen name="TestRequests" component={TestRequests} />
          <RootStack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: 'Information om syssla' }}
          />

          <RootStack.Screen
            name="SelectedHouseholdNav"
            component={SelectedHouseholdTopTabNav}
            options={({ navigation }) => ({
              title: selectedHousehold?.name,
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
                  <Text style={s.title}>Profil</Text>
                  <IconButton
                    icon="account-edit-outline"
                    size={35}
                    onPress={() => navigation.navigate('Home')}
                  />
                </View>
              ),
              headerRight: () => (
                <Button
                  mode="contained"
                  onPress={() => {
                    signOut(auth);
                    navigation.navigate('Home');
                  }}
                  style={{
                    backgroundColor: '#000',
                    borderRadius: 10,
                    width: 120,
                  }}
                  labelStyle={{ fontSize: 16, color: 'lightgray' }}
                >
                  Logga ut
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
          <RootStack.Screen
            name="EditTask"
            component={EditTaskScreen}
            options={({ route }) => ({
              headerRight: () => <ArchivedTask task={route.params.task} />,
            })}
          />
        </>
      ) : (
        <>
          <RootStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ title: 'Logga in' }}
          />
          <RootStack.Screen
            name="SignUp"
            component={SignUpScreen}
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
