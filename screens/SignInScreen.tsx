import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import LoadingIndicator from '../store/LoadingIndicator';
import { signInUser } from '../store/user/userActions';
import { selectUserAuthenticationIsLoading } from '../store/user/userSelectors';
import { EmailPassword } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export default function SignInScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const loginErrorMessage = useAppSelector(
    (state) => state.user.signInErrorMessage,
  );
  const isLoading = useAppSelector(selectUserAuthenticationIsLoading);

  const handleLogin = async () => {
    const emailPassword: EmailPassword = {
      email,
      password,
    };
    try {
      await dispatch(signInUser(emailPassword)).unwrap();
      navigation.navigate('YourHouseholds');
    } catch (error) {}
  };

  const navigateToRegister = () => {
    console.log('Register button pressed');
    navigation.navigate('SignUp');
  };

  return (
    <View style={s.container}>
      <View style={{ padding: 14, gap: 14 }}>
        <TextInput
          style={s.textInput}
          mode="outlined"
          label={'Användarnamn'}
          value={email}
          onChangeText={(text) => setEmail(text)}
          theme={{ roundness: 10 }}
          keyboardType="email-address"
        />
        <TextInput
          style={s.textInput}
          mode="outlined"
          label={'Lösenord'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          theme={{ roundness: 10 }}
        />
        <Text style={s.errorMessage}>{loginErrorMessage}</Text>
        <Button
          mode="contained"
          style={{ marginTop: 30 }}
          onPress={handleLogin}
        >
          Logga in
        </Button>
        <Button
          mode="contained"
          style={{ marginTop: 30 }}
          onPress={navigateToRegister}
        >
          Registera konto
        </Button>
      </View>
      {LoadingIndicator(isLoading)}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  textInput: {
    minHeight: 60,
  },
  errorMessage: {
    fontSize: 17,
    color: 'red',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
  },
});
