import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import EffortPicker from '../Components/EffortPicker';

export default function CreateTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [weight, setWeight] = useState(0);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // Generate days 1 to 31

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

      {/* TODO: lägg in komponent väljare */}

      {isDatePickerOpen ? (
        <Surface style={[s.RecurringValue, s.baseStyle]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {days.map((day) => (
              <Pressable
                key={day}
                onPress={() => {
                  setFrequency(day);
                  setIsDatePickerOpen(!isDatePickerOpen);
                }}
              >
                <View style={[s.baseStyle]}>
                  <Text style={s.dateText}>{day}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </Surface>
      ) : (
        <Pressable onPress={() => setIsDatePickerOpen(!isDatePickerOpen)}>
          <Surface style={[s.RecurringDate, s.baseStyle]}>
            <Text style={[s.padding, s.titleText]}>Återkommer:</Text>
            <Text style={s.padding}>var {frequency} dag</Text>
          </Surface>
        </Pressable>
      )}

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
