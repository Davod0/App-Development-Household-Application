import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Surface, TextInput } from 'react-native-paper';
import DatePicker from '../components/DatePicker';
import EffortPicker from '../components/EffortPicker';

export default function CreateTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [weight, setWeight] = useState(0);

  const handleCreateTask = () => {
    console.log(title);
    console.log(description);
    console.log(weight);
    console.log(frequency);
    Alert.alert('En syssla är skapad');
  };

  return (
    <View style={s.container}>
      <Surface>
        <TextInput
          placeholder="Titel"
          placeholderTextColor="#bdbdbd"
          value={title}
          onChangeText={setTitle}
        />
      </Surface>
      <Surface>
        <TextInput
          placeholder="Beskrivning"
          placeholderTextColor="#bdbdbd"
          multiline={true}
          numberOfLines={5}
          value={description}
          onChangeText={setDescription}
        />
      </Surface>

      {/* använder DatePicker komponenten till att kunna välja återkommande värdet */}
      <DatePicker frequency={frequency} setFrequency={setFrequency} />

      {/* använder EffortPicker komponenten till att kunna välja energivärdet */}
      <EffortPicker weight={weight} setWeight={setWeight} />

      <Button mode="contained" onPress={handleCreateTask}>
        Skapa
      </Button>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    margin: 15,
    gap: 15,
  },
});
