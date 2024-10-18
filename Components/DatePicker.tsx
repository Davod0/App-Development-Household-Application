import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

type Props = {
  frequency: number;
  setFrequency: any;
};

export default function DatePicker({ frequency, setFrequency }: Props) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // Generate days 1 to 31

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
        <Text style={[s.padding, s.titleText]}>Återkommer:</Text>
        <Text style={s.padding}>var {frequency} dag</Text>
      </Surface>
    </Pressable>
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
