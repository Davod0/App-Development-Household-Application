import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signInUser, signUpUser } from '../../store/user/userActions';
import {
  selectCurrentUser,
  selectUserAuthenticationIsLoading,
} from '../../store/user/userSelectors';
import { EmailPassword } from '../../types';

export default function TestScreenUsingStore() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectUserAuthenticationIsLoading);

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
    <View style={{ paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 30 }}>Test Screen</Text>
      <Text style={{ fontSize: 30, paddingBottom: 10, paddingTop: 10 }}>
        Sign Up
      </Text>
      <TextInput
        keyboardType="email-address"
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
        keyboardType="email-address"
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

      {LoadingIndicator(isLoading)}
    </View>
  );
}
