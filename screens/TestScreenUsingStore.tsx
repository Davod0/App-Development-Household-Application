import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import LoadingIndicator from '../store/LoadingIndicator';
import {
  selectCurrentUser,
  selectUserAuthenticationIsLoading,
} from '../store/user/selectors';
import { signInUser, signUpUser } from '../store/user/userActions';
import { EmailPassword, Request } from '../types';
import { addRequest } from '../store/requests/requestsActions';

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

  const handleRequest = () => {
    const request: Request = {
      id: '',
      householdId: '',
      memberId: '',
    };
    const requestId = JSON.stringify(request);
    dispatch(addRequest(requestId));
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
      <Button title="request data" onPress={handleRequest} />

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
