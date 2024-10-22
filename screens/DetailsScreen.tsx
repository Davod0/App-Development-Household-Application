import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Surface, Text } from 'react-native-paper';
import { mockedTasks } from '../data';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ navigation }: Props) {
  const taskId = 'task-1';
  const task = mockedTasks.find((t) => t.id === taskId);

  const handleSave = () => {};

  return (
    <View style={s.container}>
      <Surface style={s.titleContainer} elevation={1}>
        <Text variant="displaySmall">{task?.name}</Text>
      </Surface>
      <Surface style={s.descriptionContainer} elevation={1}>
        <Text variant="headlineLarge">{task?.description}</Text>
      </Surface>
      <Surface style={s.frequencyContainer} elevation={1}>
        <View style={s.frequencyContent}>
          <View>
            <Text variant="headlineSmall" style={s.frequencyLabel}>
              Återkommer:
            </Text>
          </View>
          <View style={s.frequencyValueContainer}>
            <Text variant="headlineSmall" style={s.frequencyText}>
              var
            </Text>
            <View style={s.frequencyCircle}>
              <Text variant="titleMedium" style={{ color: '#fff' }}>
                {task?.frequency}
              </Text>
            </View>
            <Text variant="headlineSmall" style={s.frequencyText}>
              dag
            </Text>
          </View>
        </View>
      </Surface>
      <Surface style={s.valueContainer} elevation={1}>
        <View style={s.valueContent}>
          <View>
            <Text variant="headlineSmall" style={s.valueLabel}>
              Värde:
            </Text>
            <Text variant="titleMedium" style={s.valueDescription}>
              Hur energikrävande är sysslan?
            </Text>
          </View>
          <View style={s.valueCircle}>
            <Text variant="headlineSmall">{task?.weight}</Text>
          </View>
        </View>
      </Surface>

      <View style={s.footer}>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          textColor="black"
          theme={{ roundness: 0 }}
          icon={({ color }) => (
            <Icon source="plus-circle-outline" size={27} color={color} />
          )}
          labelStyle={{
            fontSize: 20,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
          onPress={handleSave}
        >
          Spara
        </Button>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          textColor="black"
          theme={{ roundness: 0 }}
          icon={({ color }) => (
            <Icon source="close-circle-outline" size={27} color={color} />
          )}
          labelStyle={{
            fontSize: 20,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
          onPress={() => {
            navigation.goBack();
          }}
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
    justifyContent: 'flex-start',
    backgroundColor: '#F2F2F2',
  },
  titleContainer: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  descriptionContainer: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  frequencyContainer: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  frequencyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  frequencyLabel: {
    textAlign: 'left',
    fontWeight: 'bold',
  },
  frequencyValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '35%',
  },
  frequencyText: {
    textAlign: 'right',
  },
  frequencyCircle: {
    borderRadius: 15,
    borderColor: '#CD5D6F',
    borderWidth: 1,
    backgroundColor: '#CD5D6F',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  valueContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  valueLabel: {
    textAlign: 'left',
    fontWeight: 'bold',
  },
  valueDescription: {
    textAlign: 'left',
    color: '#828282',
  },
  valueCircle: {
    borderRadius: 30,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    backgroundColor: '#F2F2F2',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
});
