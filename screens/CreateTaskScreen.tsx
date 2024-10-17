import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';

export default function CreateTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //   not used yet
  const [frequency, setFrequency] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleCreateTask = () => {
    console.log(title);
    console.log(description);
    console.log(weight);
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

      {/* TODO: Gör om till komponent?*/}

      {isPickerOpen ? (
        <Surface style={[s.RecurringValue, s.baseStyle]}>
          {[1, 2, 4, 6, 8].map((value) => (
            <Pressable
              style={s.RecurringValue}
              onPress={() => {
                setWeight(value);
                setIsPickerOpen(!isPickerOpen);
              }}
            >
              <View style={s.valueNumberOptionsContainer}>
                <Text key={value} style={s.valueNumberOptions}>
                  {value}
                </Text>
              </View>
            </Pressable>
          ))}
        </Surface>
      ) : (
        <>
          <Pressable onPress={() => setIsPickerOpen(!isPickerOpen)}>
            <Surface style={[s.RecurringValue, s.baseStyle]}>
              <View style={s.padding}>
                <Text style={s.titleText}>Värde:</Text>
                <Text>Hur energikrävande är sysslan?</Text>
              </View>
              <View style={s.padding}>
                <View style={s.valueNumberContainer}>
                  <Text style={s.valueNumber}>{weight}</Text>
                </View>
              </View>
            </Surface>
          </Pressable>
        </>
      )}

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
