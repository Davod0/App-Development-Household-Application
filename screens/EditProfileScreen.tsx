import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch } from '../store/hooks';
import { updateMember } from '../store/members/membersActions';
import { selectMemberForUserInSelectedHousehold } from '../store/members/membersSelectors';
import { Member } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfile({ route }: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const member = useSelector(selectMemberForUserInSelectedHousehold);

  const [name, setName] = useState(member?.name || '');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleUpdateMember = async () => {
    if (!member?.id) return;

    const updatedMember: Member = {
      ...member,
      name,
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
      <View style={styles.container}>
        <Text style={[styles.text, { color: theme.colors.primary }]}>
          No member data available.
        </Text>
      </View>
    );
  }

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
        onChangeText={setName}
        mode="outlined"
      />

      <Button
        mode="contained"
        onPress={handleUpdateMember}
        style={styles.button}
        loading={loading}
        disabled={loading}
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
