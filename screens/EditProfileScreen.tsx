import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfile() {
  function setText(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Profile</Text>

      <TextInput
        label="Name"
        value={'text'}
        onChangeText={(text) => setText('text')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
