import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Surface, TextInput } from 'react-native-paper';
import DatePicker from '../components/DatePicker';
import EffortPicker from '../components/EffortPicker';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch } from '../store/hooks';
import { addTask } from '../store/tasks/tasksAction';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateTask'>;

export default function CreateTaskScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState(1);
  const [weight, setWeight] = useState(1);
  const [showCreatedDialog, setShowCreatedDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const dispatch = useAppDispatch();

  const handleCreateTask = async () => {
    if (!name) {
      setShowConfirmationDialog(true);
      return;
    }
    console.log(name);
    console.log(description);
    console.log(weight);
    console.log(frequency);
    setShowCreatedDialog(true);
    const task = await dispatch(
      addTask({ name, description, frequency, weight }),
    ).unwrap();
    console.log(task);

    // navigate
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
        onDismiss={() => {
          setShowCreatedDialog(false);
          navigation.goBack();
        }}
      >
        <Dialog.Title>Sysslan har skapats</Dialog.Title>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setShowCreatedDialog(false);
              navigation.goBack();
            }}
          >
            OK
          </Button>
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
