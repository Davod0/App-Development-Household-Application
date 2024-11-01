import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { avatarList } from '../library/avatarList';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch } from '../store/hooks';
import { selectMemberForUserInSelectedHousehold } from '../store/members/membersSelectors';
import { Member } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfile({ route }: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const member = useSelector(selectMemberForUserInSelectedHousehold);

  const [name, setName] = useState(member?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(
    member?.avatar || avatarList.fox,
  );
  const [loading, setLoading] = useState(false);

  const handleUpdateMember = async () => {
    if (!member?.id) return;

    const updatedMember: Member = {
      ...member,
      name,
      avatar: selectedAvatar,
    };
  };
  const renderAvatarItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => setSelectedAvatar(item[0])}
      style={styles.avatarItem}
    >
      <Avatar.Text
        label={item[1].icon}
        size={50}
        style={{
          backgroundColor: item[1].color,
          opacity: selectedAvatar === item[0] ? 1 : 0.5,
        }}
      />
      <Text style={{ color: selectedAvatar === item[0] ? 'blue' : 'black' }}>
        {item[0]}
      </Text>
    </TouchableOpacity>
  );

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

      <FlatList
        data={Object.entries(avatarList)}
        renderItem={renderAvatarItem}
        keyExtractor={(item) => item[0]}
        numColumns={3}
        contentContainerStyle={styles.avatarList}
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
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  avatarList: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarItem: {
    alignItems: 'center',
    margin: 10,
  },
});
