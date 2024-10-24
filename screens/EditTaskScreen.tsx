import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Surface, TextInput } from 'react-native-paper';
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
      <View style={s.inputContainer}>
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
      <View style={s.buttonContainer}>
        <Button
          mode="elevated"
          theme={{ roundness: 0 }}
          style={s.button}
          labelStyle={s.buttonText}
          icon={({ color }) => (
            <Icon source="check-circle-outline" size={27} color={color} />
          )}
        >
          Spara
        </Button>
        <Button
          mode="elevated"
          theme={{ roundness: 0 }}
          style={s.button}
          labelStyle={s.buttonText}
          icon={({ color }) => (
            <Icon source="close-circle-outline" size={27} color={color} />
          )}
        >
          Stäng
        </Button>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  inputContainer: {
    margin: 15,
    gap: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 30,
  },
});
