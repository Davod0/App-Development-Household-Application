import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';

export default function CreateTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //   not used yet
  const [frequency, setFrequency] = useState(0);
  const [weight, setWeight] = useState(0);

  const handleCreateTask = () => {
    console.log(title);
    console.log(description);
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
      {/* TODO: lägg in komponent väljare */}
      <Surface style={[s.RecurringDate, s.baseStyle]}>
        <Text style={[s.padding, s.titleText]}>Återkommer:</Text>
        <Text style={s.padding}>var 7 dag</Text>
      </Surface>
      {/* TODO: lägg in komponent energi */}
      <Surface style={[s.RecurringValue, s.baseStyle]}>
        <View style={s.padding}>
          <Text style={s.titleText}>Värde:</Text>
          <Text>Hur energikrävande är sysslan?</Text>
        </View>
        <View style={s.padding}>
          <Text>2</Text>
        </View>
      </Surface>
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
  },
  padding: {
    padding: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
