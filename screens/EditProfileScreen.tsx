import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfile() {
  function setText(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.primary }]}>
        Edit Profile
      </Text>

      <TextInput
        style={styles.input}
        label="Name"
        placeholder="Enter your name"
        value={'text'}
        onChangeText={(text) => setText(text)}
        mode="outlined"
      />

      <Button mode="contained" onPress={() => {}} style={styles.button}>
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
