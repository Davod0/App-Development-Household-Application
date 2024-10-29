import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, SegmentedButtons, Text } from 'react-native-paper';
import { mockedMembers } from '../data';
import { auth } from '../firebase';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useSelectedHouseholddata } from '../store/user/hooks';
import {
  selectColorMode,
  selectCurrentUser,
} from '../store/user/userSelectors';
import { setColorMode } from '../store/user/userSlice';
import { ColorMode } from '../theme/ThemeProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  useSelectedHouseholddata();
  const colorMode = useAppSelector(selectColorMode);
  const user = useAppSelector(selectCurrentUser)!;
  const dispatch = useAppDispatch();

  const userId = 'user-1';
  const member = mockedMembers.find((m) => m.userId === userId);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleLogout}
          mode="text"
          style={s.logoutButton}
          labelStyle={{ fontSize: 20 }}
        >
          Logga ut
        </Button>
      ),
    });
  }, [navigation]);

  if (!member) {
    throw new Error('bad userId: ' + userId);
  }

  const avatar = member.avatar.icon;
  const avatarColor = member.avatar.color;
  if (!avatar) {
    throw new Error('bad avatarId: ' + member.avatar);
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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

        <Text variant="headlineSmall">Gmail</Text>
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
  logoutButton: {
    marginRight: 10,
  },
});
