import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Icon, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
export default function RegisterScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateInput = () => {
    // I just check if user have written anything in TextInput now. Can add other validation controls later (if we want)
    if (!username) {
      Alert.alert('Validation Error', 'Användarnamn kan inte vara tomt.');
      return false;
    }
    if (!password) {
      Alert.alert('Validation Error', 'Password kan inte vara tomt.');
      return false;
    }

    return true;
  };
  const registerAccount = () => {
    if (validateInput()) {
      console.log('All inputs are valid. We can create a new user.');
      navigation.navigate('Home');
    }
  };

  return (
    <View style={s.container}>
      <View style={{ padding: 14, gap: 14 }}>
        <TextInput
          style={s.textInput}
          mode="outlined"
          label={'Användarnamn'}
          value={username}
          onChangeText={(text) => setUsername(text)}
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
          onPress={registerAccount}
        >
          Registrera konto
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
          onPress={registerAccount}
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
