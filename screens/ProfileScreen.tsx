import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Dialog,
  Portal,
  SegmentedButtons,
  Text,
} from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteMember } from '../store/members/membersActions'; // Import deleteMember
import { selectAllMembersBySelectedHousehold } from '../store/members/membersSelectors';
import { useSelectedHouseholdData } from '../store/user/hooks';
import {
  selectColorMode,
  selectCurrentUser,
} from '../store/user/userSelectors';
import { setColorMode } from '../store/user/userSlice';
import { ColorMode } from '../theme/ThemeProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  useSelectedHouseholdData();
  const dispatch = useAppDispatch();
  const colorMode = useAppSelector(selectColorMode);
  const user = useAppSelector(selectCurrentUser)!;
  const members = useAppSelector(selectAllMembersBySelectedHousehold);
  const member = members.find((member) => member.userId === user?.uid)!;

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const handleCancelLeaveHousehold = () => setVisible(false);

  const handleLeaveHousehold = async () => {
    await dispatch(deleteMember(member.id))
      .unwrap()
      .then(() => {
        console.log('Leave household confirmed');
      })
      .catch((error) => {
        console.error(`Error leaving household: ${error}`);
      });
    setVisible(false);
    navigation.navigate('YourHouseholds');
  };

  if (!member) {
    return <Text>no member exists!</Text>;
  }
  const avatar = member.avatar.icon;
  const avatarColor = member.avatar.color;
  return (
    <View style={s.container}>
      <View style={s.memberInfo}>
        <View
          style={{
            backgroundColor: avatarColor,
            width: 160,
            height: 160,
            borderRadius: 125,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar.Text
            size={230}
            label={avatar}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
        <Text style={s.name}>{member.name}</Text>
        <Text variant="displaySmall">____________________</Text>
        <Text variant="headlineSmall">Email</Text>
        <Text style={s.emailText}>{user.email}</Text>
        <Text
          style={{ position: 'absolute', bottom: 130, alignSelf: 'center' }}
          variant="headlineLarge"
        >
          Välj tema för appen
        </Text>
        <SegmentedButtons
          style={{ position: 'absolute', bottom: 60, alignSelf: 'center' }}
          value={colorMode}
          onValueChange={(value) => dispatch(setColorMode(value as ColorMode))}
          buttons={[
            { value: 'light', label: 'Ljust' },
            { value: 'dark', label: 'Mörkt' },
            { value: 'auto', label: 'Enhetens' },
          ]}
        />
        <Button
          mode="contained"
          onPress={showDialog}
          style={[
            s.leaveButton,
            { position: 'absolute', bottom: 10, alignSelf: 'center' },
          ]}
          buttonColor="#d32f2f"
          textColor="#ffffff"
        >
          Lämna hushåll
        </Button>

        <Portal>
          <Dialog visible={visible} onDismiss={handleCancelLeaveHousehold}>
            <Dialog.Title>Bekräfta</Dialog.Title>
            <Dialog.Content>
              <Text>Är du säker på att du vill lämna hushållet?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleCancelLeaveHousehold}>Avbryt</Button>
              <Button onPress={handleLeaveHousehold}>Lämna</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  memberInfo: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
    marginTop: 20,
  },
  emailText: {
    fontSize: 20,
    color: '#555',
    marginVertical: 10,
  },
  leaveButton: {
    marginTop: 10,
  },
});
