import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Household, NewUser } from '../data';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createHousehold } from '../store/householdReducer';
import { createUser } from '../store/user/userActions';

export default function TestScreenUsingStore() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [householdName, setHouseholdName] = useState('');
  const users = useAppSelector((state) => state.users);
  const household = useAppSelector((state) => state.household);
  const dispatch = useAppDispatch();

  const handleSaveUser = () => {
    const user: NewUser = {
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
        <Text style={{ fontSize: 30 }}>All Users</Text>
        {users.map((user) => (
          <View key={user.id}>
            <Text>User ID: {user.id}</Text>
            <Text>First Name: {user.firstName}</Text>
            <Text>Last Name: {user.lastName}</Text>
            <Text>__________________________________</Text>
          </View>
        ))}
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
