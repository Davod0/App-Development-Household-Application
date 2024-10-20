import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { EmailPassword } from '../data';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch } from '../store/hooks';
import { signUpUser } from '../store/user/userActions';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useAppDispatch();

  const emailHasErrors = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3,}$/;
    return !emailRegex.test(email);
  };

  const PasswordHasErrors = () => {
    return password.length < 6;
  };

  useEffect(() => {
    if (!emailHasErrors() && !PasswordHasErrors()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const signUpAccount = async () => {
    const emailPassword: EmailPassword = {
      email,
      password,
    };
    try {
      await dispatch(signUpUser(emailPassword)).unwrap();
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
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
        />
        <HelperText type="error" visible={emailHasErrors()}>
          E-postadressen är ogiltig!
        </HelperText>
        <TextInput
          style={s.textInput}
          mode="outlined"
          label={'Lösenord'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          theme={{ roundness: 10 }}
        />
        <HelperText type="error" visible={PasswordHasErrors()}>
          Lösenord måste vara minst 6 tecken.
        </HelperText>
        <Button
          mode="contained"
          style={{ marginTop: 30 }}
          onPress={signUpAccount}
          disabled={isButtonDisabled}
        >
          Registrera konto
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
    fontSize: 24,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
