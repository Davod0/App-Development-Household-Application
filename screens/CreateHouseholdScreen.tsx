import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Icon, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch } from '../store/hooks';
import { createHousehold } from '../store/households/householdsActions';

type props = NativeStackScreenProps<RootStackParamList, 'CreateHouseHold'>;

export default function CreateHouseholdScreen({ navigation }: props) {
  const [HounseholdName, setHounseholdName] = useState('');
  const dispatch = useAppDispatch();

  const validateHouseHoldName = () => {
    if (!HounseholdName) {
      Alert.alert('Validation error', 'Household name kan inte vara tomt.');
      return false;
    }
    return true;
  };

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  const createHouseHold = () => {
    if (validateHouseHoldName()) {
      const householdCode = generateRandomCode();
      dispatch(
        createHousehold({
          name: HounseholdName,
          code: householdCode,
        }),
      );
      console.log('Household name is right. We can create household.');
      navigation.navigate('Home');
    }
  };

  return (
    <View style={s.container}>
      <View style={{ margin: 10 }}>
        <TextInput
          mode="outlined"
          label={'Namn'}
          value={HounseholdName}
          onChangeText={(text) => setHounseholdName(text)}
          theme={{ roundness: 10 }}
          style={{ height: 60, justifyContent: 'center' }}
        />
        <Button
          mode="contained"
          style={{ marginTop: 45, height: 50, justifyContent: 'center' }}
          onPress={createHouseHold}
        >
          Skapa hushåll
        </Button>
      </View>
      <View>
        <Button
          icon={({ color }) => (
            <Icon source="close-circle-outline" size={36} color={color} />
          )}
          mode="elevated"
          textColor="black"
          theme={{ roundness: 0 }}
          onPress={() => {
            navigation.goBack();
          }}
          labelStyle={{
            fontSize: 24,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
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
  },
});
