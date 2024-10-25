import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Icon, Surface, TextInput } from 'react-native-paper';
import DatePicker from '../components/DatePicker';
import EffortPicker from '../components/EffortPicker';
import { useAppDispatch } from '../store/hooks';
import { updateTask } from '../store/tasks/tasksAction';
import { CreateTask, Task } from '../types';

// Define the route type for the screen
type EditTaskScreenRouteProp = RouteProp<{ params: { task: Task } }, 'params'>;

export default function EditTaskScreen() {
  const route = useRoute<EditTaskScreenRouteProp>();
  const { task } = route.params;

  // const ta = useAppSelector(selectTaskFromID('LbdqNw97aXeymeklO76v'));

  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [frequency, setFrequency] = useState(task.frequency);
  const [weight, setWeight] = useState(task.weight);
  const [showUpdatedDialog, setUpdatedDialog] = useState(false);

  const dispatch = useAppDispatch();

  const handleUpdateTask = () => {
    console.log(name);
    console.log(description);
    console.log(frequency);
    console.log(weight);
    setUpdatedDialog(true);

    const updates: CreateTask = {
      name: name,
      description: description,
      frequency: frequency,
      weight: weight,
    };
    dispatch(updateTask({ id: task.id, updates }));
  };

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
          onPress={handleUpdateTask}
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
      <Dialog
        visible={showUpdatedDialog}
        onDismiss={() => setUpdatedDialog(false)}
      >
        <Dialog.Title>Sysslan har skapats</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={() => setUpdatedDialog(false)}>OK</Button>
        </Dialog.Actions>
      </Dialog>
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
