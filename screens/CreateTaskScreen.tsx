import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Surface, TextInput } from 'react-native-paper';
import DatePicker from '../components/DatePicker';
import EffortPicker from '../components/EffortPicker';
import { useAppDispatch } from '../store/hooks';
import { addNewTask } from '../store/tasks/tasksSlice';

export default function CreateTaskScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [weight, setWeight] = useState(0);
  const [showCreatedDialog, setShowCreatedDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const dispatch = useAppDispatch();

  const handleCreateTask = () => {
    if (!name) {
      setShowConfirmationDialog(true);
      return;
    }
    console.log(name);
    console.log(description);
    console.log(weight);
    console.log(frequency);
    setShowCreatedDialog(true);
    // TODO: byt ut till en Thunk i framtiden
    dispatch(addNewTask({ name, description, frequency, weight }));
  };

  return (
    <View style={s.container}>
      <Surface>
        <TextInput
          placeholder="Titel"
          placeholderTextColor="#bdbdbd"
          value={name}
          onChangeText={setName}
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
      <Dialog
        visible={showCreatedDialog}
        onDismiss={() => setShowCreatedDialog(false)}
      >
        <Dialog.Title>Sysslan har skapats</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={() => setShowCreatedDialog(false)}>OK</Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={showConfirmationDialog}
        onDismiss={() => setShowConfirmationDialog(false)}
      >
        <Dialog.Title>Du måste skriva ett namn på sysslan</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={() => setShowConfirmationDialog(false)}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    margin: 15,
    gap: 15,
  },
});
