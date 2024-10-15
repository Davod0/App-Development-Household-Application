import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function JoinHouseholdScreen() {
  const [houseCode, setHouseCode] = useState('');

  // quick check to see if input field is empty
  const validateHouseCode = () => {
    if (!houseCode) {
      Alert.alert('Validation error', 'Fältet får inte vara tomt.');
      return false;
    }
    return true;
  };

  const handleSubmitCode = () => {
    if (validateHouseCode()) {
      // TODO: få 'ok' knappen till samma lila färg
      Alert.alert(
        'Förfrågan har registrerats',
        'Ägaren måste godkänna din förfrågan',
      );
      console.log(houseCode);
      setHouseCode('');
    }
  };

  return (
    <View style={s.container}>
      <View style={{ padding: 14, gap: 14 }}>
        <TextInput
          style={s.textInput}
          mode="outlined"
          label={'Kod till hushållet'}
          value={houseCode}
          onChangeText={(text) => setHouseCode(text)}
        />
        <Button mode="contained" style={s.button} onPress={handleSubmitCode}>
          Gå med i hushåll
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
  textInput: {
    minHeight: 60,
  },
  button: {
    marginTop: 20,
  },
});
