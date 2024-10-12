import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { User } from "../data";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createUser } from "../store/userReducer";

export default function TestScreenUsingStore() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    const user: User = {
      id: "1",
      firstName,
      lastName,
    };
    dispatch(createUser(user));
    setFirstName("");
    setLastName("");
  };

  return (
    <View>
      <Text>Test Screen</Text>
      <Text>First Name:</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter your first name"
      />

      <Text>Last Name:</Text>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter your last name"
      />
      <Button title="Save" onPress={handleSave} />
      <View>
        <Text>User</Text>
        <Text>First Name: {user.firstName}</Text>
        <Text>Last Name: {user.lastName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
