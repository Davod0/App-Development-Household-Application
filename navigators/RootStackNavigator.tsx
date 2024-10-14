import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import CreateHouseholdScreen from '../screens/CreateHouseholdScreen';
import HomeScreen from '../screens/HomeScreen';
import JoinHouseholdScreen from '../screens/JoinHouseholdScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TestScreenUsingStore from '../screens/TestScreenUsingStore';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Register: undefined;
  TestStore: undefined;
  CreateHouseHold: undefined;
  JoinHousehold: undefined
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator initialRouteName="JoinHousehold">
      <RootStack.Screen name="Home" component={HomeScreen} />
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
      <RootStack.Screen name="TestStore" component={TestScreenUsingStore} />
      <RootStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTitle: () => (
            <View style={s.titleContainer}>
              <Text style={s.title}>Registrera dig</Text>
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
                // TODO: change route to edit-profile
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          ),
          headerRight: () => (
            <Button
              mode="contained"
              // TODO: change route to logout? add confirmation?
              onPress={() => navigation.navigate('Home')}
            >
              Logout
            </Button>
          ),
        })}
      />
      <RootStack.Screen name='JoinHousehold' component={JoinHouseholdScreen}         options={{
          headerTitle: () => (
            <View style={s.titleContainer}>
              <Text style={s.title}>Gå med i hushåll</Text>
            </View>
          ),
        }} />
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
