import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Surface, TextInput } from 'react-native-paper';
import DatePicker from '../Components/DatePicker';
import EffortPicker from '../Components/EffortPicker';

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
  dateText: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  container: {
    margin: 15,
    gap: 15,
  },
  baseStyle: {
    borderRadius: 10,
    padding: 10,
  },
  RecurringDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  RecurringValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  padding: {
    padding: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  valueNumberContainer: {
    backgroundColor: '#e7e0ec',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueNumber: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  valueNumberOptionsContainer: {
    backgroundColor: '#e7e0ec',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueNumberOptions: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
