import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Household, User } from '../data';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createHousehold } from '../store/householdReducer';
import { createUser } from '../store/user/userReducer';

export default function TestScreenUsingStore() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [householdName, setHouseholdName] = useState('');
  const user = useAppSelector((state) => state.user);
  const household = useAppSelector((state) => state.household);
  const dispatch = useAppDispatch();

  const handleSaveUser = () => {
    const user: User = {
      id: '1',
      firstName,
      lastName,
    };
    dispatch(createUser(user));
    setFirstName('');
    setLastName('');
  };

  const handleSaveHousehold = () => {
    const household: Household = {
      id: '1',
      code: '1234',
      name: householdName,
    };
    dispatch(createHousehold(household));
    setHouseholdName('');
  };

  return (
    <View>
      <Text style={{ fontSize: 30 }}>Test Screen</Text>
      <Text>First Name:</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter your first name"
      />

      <Text>Last Name:</Text>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter your last name"
      />
      <Button title="Save" onPress={handleSaveUser} />

      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontSize: 30 }}>User</Text>
        <Text>User ID: {user.id}</Text>
        <Text>First Name: {user.firstName}</Text>
        <Text>Last Name: {user.lastName}</Text>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontSize: 30 }}>Household</Text>
        <TextInput
          placeholder="Enter your household name"
          value={householdName}
          onChangeText={setHouseholdName}
        />
        <Button title="Save" onPress={handleSaveHousehold} />
        <Text>Household ID: {household.id}</Text>
        <Text>Household name: {household.name}</Text>
        <Text>Household code: {household.code}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
