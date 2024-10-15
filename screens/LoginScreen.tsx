import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [pasword, setPassword] = useState('');

  const hanldeLogin = () => {
    navigation.navigate('Home');
  };
  const navigateToRegister = () => {};

  return (
    <View>
      <View style={{ padding: 14, gap: 14 }}>
        <TextInput
          style={s.textInput}
          label={'Användarnamn'}
          value={username}
          onChangeText={(text) => setUsername(text)}
          theme={{ roundness: 10 }}
        />
        <TextInput
          style={s.textInput}
          label={'Lösenord'}
          value={pasword}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          theme={{ roundness: 10 }}
        />
        <Button
          mode="contained"
          style={{ marginTop: 30 }}
          onPress={hanldeLogin}
        >
          Login
        </Button>
        <Button
          mode="contained"
          style={{ marginTop: 30 }}
          onPress={navigateToRegister}
        >
          Register
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
