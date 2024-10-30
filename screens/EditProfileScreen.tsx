import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch } from '../store/hooks';
import { updateMember } from '../store/members/membersActions';
import { Member } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfile({ route }: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Retrieve member data passed through navigation params
  const { member } = route.params;

  // Initialize state based on member data
  const [name, setName] = useState(member?.name || '');
  const [avatar, setAvatar] = useState(member?.avatar || '');

  const handleUpdateMember = () => {
    if (!member?.id) return; // Ensure member ID is available

    const updatedMember: Member = {
      ...member,
      name,
      avatar,
    };

    dispatch(updateMember(updatedMember))
      .unwrap()
      .then(() => {
        console.log('Member updated successfully');
      })
      .catch((error) => {
        console.error('Error updating member:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.primary }]}>
        Edit Profile
      </Text>

      <TextInput
        style={styles.input}
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
        mode="outlined"
      />
      {/* 
      <TextInput
        style={styles.input}
        label="Avatar"
        placeholder="Enter avatar URL"
        value={avatar}
        onChangeText={(text) => setAvatar(text)}
        mode="outlined"
      /> */}

      <Button
        mode="contained"
        onPress={handleUpdateMember}
        style={styles.button}
      >
        Save Changes
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
