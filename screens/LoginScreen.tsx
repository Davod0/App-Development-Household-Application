import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, TextInput } from 'react-native-paper';
import { EmailPassword } from '../data';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch } from '../store/hooks';
import { signInUser } from '../store/user/userActions';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    //Check with database if correct!
    // console.log('Password and Username match');
    // navigation.navigate('Home');
    const emailPassword: EmailPassword = {
      email,
      password,
    };
    try {
      await dispatch(signInUser(emailPassword)).unwrap();
      navigation.navigate('Home');
    } catch (error) {}
  };

  const navigateToRegister = () => {
    console.log('Register button pressed');
    navigation.navigate('Register');
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
      <View style={s.footer}>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          textColor="black"
          theme={{ roundness: 0 }}
          icon={({ color }) => (
            <Icon source="plus-circle-outline" size={27} color={color} />
          )}
          labelStyle={{
            fontSize: 20,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
          onPress={handleLogin}
        >
          Spara
        </Button>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          textColor="black"
          theme={{ roundness: 0 }}
          icon={({ color }) => (
            <Icon source="close-circle-outline" size={27} color={color} />
          )}
          labelStyle={{
            fontSize: 20,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Stäng
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
  footer: {
    flexDirection: 'row',
    width: '100%',
  },
});
