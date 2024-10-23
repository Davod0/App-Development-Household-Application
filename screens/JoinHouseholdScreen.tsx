import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Text, TextInput } from 'react-native-paper';

export default function JoinHouseholdScreen() {
  const [houseCode, setHouseCode] = useState('');
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);

  const handleSubmitCode = () => {
    // quick check to see if input field is empty
    if (!houseCode) {
      setShowValidationDialog(true);
      return;
    }
    setShowConfirmationDialog(true);
    console.log(houseCode);
    setHouseCode('');
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
      <Dialog
        visible={showValidationDialog}
        onDismiss={() => setShowValidationDialog(false)}
      >
        <Dialog.Title>Ange en kod till hushållet</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={() => setShowValidationDialog(false)}>OK</Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={showConfirmationDialog}
        onDismiss={() => setShowConfirmationDialog(false)}
      >
        <Dialog.Title>Förfrågan har registrerats</Dialog.Title>
        <Dialog.Content>
          <Text>Ägaren måste godkänna din förfrågan</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShowConfirmationDialog(false)}>OK</Button>
        </Dialog.Actions>
      </Dialog>
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
