import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Text,
  TextInput,
} from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getHouseholdsByUserId } from '../store/households/householdsActions';
import { getMembersByHouseholdId } from '../store/members/membersActions';
import { addRequest } from '../store/requests/requestsActions';
import {
  selectRequestError,
  selectRequestIsLoading,
} from '../store/requests/requestsSelectors';
import { getMembersByCurrentUserId } from '../store/user/userActions';
import { selectCurrentUser } from '../store/user/userSelectors';

export default function JoinHouseholdScreen() {
  const [houseCode, setHouseCode] = useState('');
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const dispatch = useAppDispatch();
  const requestIsLoading = useAppSelector(selectRequestIsLoading);
  const requestError = useAppSelector(selectRequestError);
  const user = useAppSelector(selectCurrentUser);

  // testing...
  useFocusEffect(
    useCallback(() => {
      if (user) {
        dispatch(getMembersByCurrentUserId())
          .unwrap()
          .then(() => {
            dispatch(getHouseholdsByUserId())
              .unwrap()
              .then(() => {
                dispatch(getMembersByHouseholdId());
              });
          });
      }
    }, [dispatch, user, showConfirmationDialog]),
  );

  const handleSubmitCode = () => {
    if (!houseCode) {
      setShowValidationDialog(true);
      return;
    }
    const code = houseCode.trim().toUpperCase();
    dispatch(addRequest(code));
    setShowConfirmationDialog(true);
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
          onChangeText={setHouseCode}
        />
        <Button
          mode="contained"
          style={s.button}
          disabled={requestIsLoading}
          onPress={handleSubmitCode}
        >
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
        <Dialog.Title>
          {!!requestError ? 'Något gick fel...' : 'Förfrågan har registrerats'}
        </Dialog.Title>
        <Dialog.Content>
          {requestIsLoading ? (
            <ActivityIndicator animating />
          ) : (
            <>
              {!!requestError ? (
                <Text>{requestError}</Text>
              ) : (
                <Text>Ägaren måste godkänna din förfrågan</Text>
              )}
            </>
          )}
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
