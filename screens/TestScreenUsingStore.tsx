import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { EmailPassword } from '../data';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signInUser, signUpUser } from '../store/user/userActions';

export default function TestScreenUsingStore() {
  const [householdName, setHouseholdName] = useState('');
  const household = useAppSelector((state) => state.household);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useAppSelector((state) => state.user.currentUser);

  const handleSignUpUser = () => {
    const emailPassword: EmailPassword = {
      email,
      password,
    };
    dispatch(signUpUser(emailPassword));
    setEmail('');
    setPassword('');
  };

  const handleSignInUser = () => {
    const emailPassword: EmailPassword = {
      email,
      password,
    };
    dispatch(signInUser(emailPassword));
    setEmail('');
    setPassword('');
  };

  return (
    <View>
      <Text style={{ fontSize: 30 }}>Test Screen</Text>
      <Text style={{ fontSize: 30, paddingBottom: 10, paddingTop: 10 }}>
        Sign Up
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
      />
      <Button title="Sign up" onPress={handleSignUpUser} />

      <Text style={{ fontSize: 30, paddingBottom: 10, paddingTop: 40 }}>
        Sign In
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email address"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
      />
      <Button title="Sign in" onPress={handleSignInUser} />
    </View>
  );
}
