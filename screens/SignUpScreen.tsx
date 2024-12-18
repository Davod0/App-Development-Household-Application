import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signUpUser } from '../store/user/userActions';
import { EmailPassword } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export default function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [usernameInitialDisplay, setUsernameInitialDisplay] = useState(false);
  const [passwordInitialDisplay, setPasswordInitialDisplay] = useState(false);
  const dispatch = useAppDispatch();
  const registerErrorMessage = useAppSelector(
    (state) => state.user.signUpErrorMessage,
  );

  const emailHasErrors = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3,}$/;
    return !emailRegex.test(email);
  };

  const PasswordHasErrors = () => {
    return password.length < 6;
  };

  const signUpAccount = async () => {
    const emailPassword: EmailPassword = {
      email,
      password,
    };
    try {
      await dispatch(signUpUser(emailPassword)).unwrap();
      navigation.navigate('YourHouseholds');
    } catch (error) {}
  };

  const handleEmail = (text: string) => {
    setEmail(text);
    if (!usernameInitialDisplay) {
      setUsernameInitialDisplay(true);
    }
  };

  const handlePassword = (text: string) => {
    setPassword(text);
    if (!passwordInitialDisplay) {
      setPasswordInitialDisplay(true);
    }
  };

  useEffect(() => {
    if (!emailHasErrors() && !PasswordHasErrors()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  return (
    <View style={s.container}>
      <View style={{ padding: 14, gap: 10 }}>
        <TextInput
          style={s.textInput}
          mode="outlined"
          label={'Användarnamn'}
          value={email}
          onChangeText={handleEmail}
          theme={{ roundness: 10 }}
        />
        <HelperText
          style={{ marginTop: -7 }}
          type="error"
          visible={usernameInitialDisplay && emailHasErrors()}
        >
          E-postadressen är ogiltig!
        </HelperText>
        <TextInput
          style={s.textInput}
          mode="outlined"
          label={'Lösenord'}
          value={password}
          onChangeText={handlePassword}
          secureTextEntry={true}
          theme={{ roundness: 10 }}
        />
        <HelperText
          style={{ marginTop: -7 }}
          type="error"
          visible={passwordInitialDisplay && PasswordHasErrors()}
        >
          Lösenord måste vara minst 6 tecken.
        </HelperText>
        <Text style={s.errorMessage}>{registerErrorMessage}</Text>
        <Button
          mode="contained"
          onPress={signUpAccount}
          disabled={isButtonDisabled}
        >
          Skapa konto
        </Button>
      </View>
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
    color: 'red',
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
