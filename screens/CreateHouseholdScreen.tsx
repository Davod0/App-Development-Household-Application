import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Icon, TextInput } from 'react-native-paper';
import { avatarList } from '../library/avatarList';
import {
  generateRandomCode,
  getAvailableIcons,
  randomIndex,
} from '../library/utils';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addHousehold } from '../store/households/householdsActions';
import { selectCurrentUser } from '../store/user/userSelectors';

type props = NativeStackScreenProps<RootStackParamList, 'CreateHouseHold'>;

export default function CreateHouseholdScreen({ navigation }: props) {
  const [showDialog, setShowDialog] = useState(false);
  const [hounseholdName, setHounseholdName] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const createHouseHold = async () => {
    if (!hounseholdName) {
      setShowDialog(true);
      return;
    }

    const householdCode = generateRandomCode();
    const randomAvailableAvatar = await getAvailableIcons('');
    const randomAvatar =
      randomAvailableAvatar[randomIndex(randomAvailableAvatar)];
    await dispatch(
      addHousehold({
        household: {
          name: hounseholdName,
          code: householdCode,
        },
        member: {
          name: user?.email ?? 'Ägarens namn',
          userId: user!.uid,
          avatar: avatarList[randomAvatar],
          isOwner: true,
          isAllowed: true,
        },
      }),
    ).unwrap();
    navigation.navigate('YourHouseholds');
  };

  return (
    <View style={s.container}>
      <View style={{ margin: 10 }}>
        <TextInput
          mode="outlined"
          label={'Namn'}
          value={hounseholdName}
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
      <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
        <Dialog.Title>Hushållsnamn kan inte vara tomt.</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={() => setShowDialog(false)}>OK</Button>
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
});
