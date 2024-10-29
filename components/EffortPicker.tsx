import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

type Props = {
  weight: number;
  setWeight?: any;
  isReadOnly?: boolean;
};

export default function EffortPicker({
  weight,
  setWeight,
  isReadOnly = false,
}: Props) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const theme = useTheme();

  return isReadOnly ? (
    <Surface style={[s.RecurringValue, s.baseStyle]}>
      <View style={s.padding}>
        <Text style={s.titleText}>Värde:</Text>
        <Text>Hur energikrävande är sysslan?</Text>
      </View>
      <View style={s.padding}>
        <View
          style={[
            s.valueNumberContainer,
            { backgroundColor: theme.colors.onPrimary },
          ]}
        >
          <Text style={s.valueNumber}>{weight}</Text>
        </View>
      </View>
    </Surface>
  ) : isPickerOpen ? (
    <Surface style={[s.RecurringValue, s.baseStyle]}>
      {[1, 2, 4, 6, 8].map((value, index) => (
        <Pressable
          key={index}
          style={s.RecurringValue}
          onPress={() => {
            setWeight(value);
            setIsPickerOpen(!isPickerOpen);
          }}
        >
          <View
            style={[
              s.valueNumberOptionsContainer,
              {
                backgroundColor: theme.colors.primaryContainer,
                opacity: 0.5 + (0.5 * index) / 4,
              },
            ]}
          >
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
            <View
              style={[
                s.valueNumberContainer,
                { backgroundColor: theme.colors.onPrimary },
              ]}
            >
              <Text style={s.valueNumber}>{weight}</Text>
            </View>
          </View>
        </Surface>
      </Pressable>
    </>
  );
}

const s = StyleSheet.create({
  baseStyle: {
    borderRadius: 10,
    padding: 10,
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
