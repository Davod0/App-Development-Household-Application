import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Household } from '../data';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createHousehold } from '../store/householdReducer';
import { EmailPassword, signUpUser } from '../store/user/userActions';

export default function TestScreenUsingStore() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [householdName, setHouseholdName] = useState('');
  const user = useAppSelector((state) => state.user);
  const household = useAppSelector((state) => state.household);
  const dispatch = useAppDispatch();

  const handleSaveUser = () => {
    const emailPassword: EmailPassword = {
      email,
      password,
    };
    dispatch(signUpUser(emailPassword));
    setEmail('');
    setPassword('');
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
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter youre email"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter youre password"
      />
      <Button title="Save" onPress={handleSaveUser} />

      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontSize: 30 }}>Current User</Text>
        <Text>User ID: {user.currentUser?.email}</Text>
        <Text>User Email address: {user.currentUser?.uid}</Text>
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
