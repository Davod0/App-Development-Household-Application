import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { avatarList } from '../library/avatarList';
import { getAvailableIcons } from '../library/utils';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch } from '../store/hooks';
import { updateMember } from '../store/members/membersActions';
import { selectMemberForUserInSelectedHousehold } from '../store/members/membersSelectors';
import { AvatarName, Member } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfile({ route }: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const member = useSelector(selectMemberForUserInSelectedHousehold);

  const [name, setName] = useState(member?.name || '');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [availableAvatars, setAvailableAvatars] = useState<AvatarName[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarName>(
    member?.avatar?.icon as AvatarName,
  );

  useEffect(() => {
    const fetchAvailableAvatars = async () => {
      const avatars = await getAvailableIcons(member?.householdId as string);
      setAvailableAvatars(avatars);
    };
    fetchAvailableAvatars();
  }, [member?.householdId]);

  const handleUpdateMember = async () => {
    if (!member?.id || !selectedAvatar) return;

    const updatedMember: Member = {
      ...member,
      name,
      avatar: avatarList[selectedAvatar],
    };

    setLoading(true);
    try {
      await dispatch(updateMember(updatedMember)).unwrap();
      setSnackbarMessage('Member updated successfully');
    } catch (error) {
      setSnackbarMessage(`Error updating member: ${error}`);
    } finally {
      setLoading(false);
      setSnackbarVisible(true);
    }
  };

  if (!member) {
    return (
      <View style={s.container}>
        <Text style={[s.text, { color: theme.colors.primary }]}>
          No member data available.
        </Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <Text style={[s.memberIcon, { backgroundColor: member.avatar.color }]}>
        {member.avatar.icon}
      </Text>
      <Text style={[s.text, { color: theme.colors.primary }]}>
        Redigera Profil
      </Text>

      <View style={s.iconContainer}>
        {availableAvatars.map((avatarName) => (
          <Pressable
            key={avatarName}
            onPress={() => {
              setSelectedAvatar(avatarName);
            }}
          >
            <Text
              style={[
                s.icon,
                {
                  backgroundColor: avatarList[avatarName].color,
                  borderWidth: avatarName === selectedAvatar ? 2 : 2,
                  borderColor:
                    avatarName === selectedAvatar
                      ? theme.colors.primary
                      : 'transparent',
                },
              ]}
            >
              {avatarList[avatarName].icon}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        style={s.input}
        label="Namn"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        mode="outlined"
      />

      <Button
        mode="contained"
        onPress={handleUpdateMember}
        style={s.button}
        loading={loading}
        disabled={loading}
      >
        Spara Ändringar
      </Button>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  memberIcon: {
    fontSize: 70,
    padding: 10,
    borderRadius: 50,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  icon: {
    fontSize: 45,
    padding: 8,
    borderRadius: 50,
  },
});
