import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { EmailPassword } from '../data';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch } from '../store/hooks';
import { signUpUser } from '../store/user/userActions';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const validateInput = () => {
    // I just check if user have written anything in TextInput now. Can add other validation controls later (if we want)
    if (!email) {
      Alert.alert('Validation Error', 'Du måste skriva en giltig email');
      return false;
    }
    if (!password) {
      Alert.alert(
        'Validation Error',
        'Password kan inte vara tomt och måste vara minst 6 bokstäver.',
      );
      return false;
    }

    return true;
  };
  const signUpAccount = () => {
    if (validateInput()) {
      const emailPassword: EmailPassword = {
        email,
        password,
      };
      const result = dispatch(signUpUser(emailPassword));
      if (result !== null) {
        Alert.alert('User creation faild');
        setEmail('');
        setPassword('');
        // navigation.navigate('Home');
      }
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
        <TextInput
          style={s.textInput}
          mode="outlined"
          label={'Lösenord'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          theme={{ roundness: 10 }}
        />
        <Button
          mode="contained"
          style={{ marginTop: 30 }}
          onPress={signUpAccount}
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
});
