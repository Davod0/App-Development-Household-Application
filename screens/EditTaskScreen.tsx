import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, TextInput } from 'react-native-paper';
import DatePicker from '../components/DatePicker';
import EffortPicker from '../components/EffortPicker';
import { Task } from '../types';

// Define the route type for the screen
// type EditTaskScreenRouteProp = RouteProp<{ params: { task: Task } }, 'params'>;

export default function EditTaskScreen() {
  //   const route = useRoute<EditTaskScreenRouteProp>();
  //   const { task } = route.params;

  const testTask: Task = {
    id: '20',
    householdId: '2020',
    name: 'Katten',
    description: 'Mata katten 2 gånger',
    weight: 4,
    frequency: 1,
    isArchived: false,
  };

  const [name, setName] = useState(testTask.name);
  const [description, setDescription] = useState(testTask.description);
  const [frequency, setFrequency] = useState(testTask.frequency);
  const [weight, setWeight] = useState(testTask.weight);
  return (
    <View style={s.container}>
      <Surface>
        <TextInput label="Namn" value={name} onChangeText={setName} />
      </Surface>

      <Surface>
        <TextInput
          label="Beskrivning"
          multiline={true}
          numberOfLines={5}
          value={description}
          onChangeText={setDescription}
        />
      </Surface>

      <DatePicker frequency={frequency} setFrequency={setFrequency} />

      <EffortPicker weight={weight} setWeight={setWeight} />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    margin: 15,
    gap: 15,
  },
});
