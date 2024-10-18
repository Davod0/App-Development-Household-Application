import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

type Props = {
  frequency: number;
  setFrequency: any;
};

export default function DatePicker({ frequency, setFrequency }: Props) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // Genererar nummer 1 till 31

  return isDatePickerOpen ? (
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
        <Text style={s.titleText}>Återkommer:</Text>
        <View style={s.container}>
          <Text style={s.displayText}>Var</Text>
          <View style={s.dateValueContainer}>
            <Text style={s.dateValue}>{frequency}</Text>
          </View>
          <Text style={s.displayText}>dag</Text>
        </View>
      </Surface>
    </Pressable>
  );
}

const s = StyleSheet.create({
  dateText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  baseStyle: {
    borderRadius: 10,
    padding: 10,
  },
  RecurringDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  RecurringValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
  },
  displayText: {
    fontSize: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  dateValueContainer: {
    backgroundColor: '#cd5d6f',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
  },
  dateValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
