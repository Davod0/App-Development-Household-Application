import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Icon, Surface, Text } from 'react-native-paper';
import DatePicker from '../components/DatePicker';
import EffortPicker from '../components/EffortPicker';
import { mockedTasks } from '../data';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppSelector } from '../store/hooks';
import { selectTaskFromTaskID } from '../store/tasks/tasksSelectors';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskInfo'>;

export default function TaskInfoScreen({ navigation, route }: Props) {
  const taskId1 = 'task-1';
  const task1 = mockedTasks.find((t) => t.id === taskId1);

  const { taskId } = route.params;
  const task = useAppSelector(selectTaskFromTaskID(taskId));

  const handleSave = () => {};

  if (!task) {
    return <Text>Loading ....</Text>;
  }

  return (
    <View style={s.container}>
      <View style={s.insideContainer}>
        <Surface style={s.titleContainer} elevation={1}>
          <Text style={s.titleText}>{task.name}</Text>
        </Surface>

        <Surface style={s.descriptionContainer} elevation={1}>
          <ScrollView>
            <Text style={s.descriptionText}>{task.description}</Text>
          </ScrollView>
        </Surface>

        <DatePicker frequency={task.frequency} isReadOnly={true} />

        <EffortPicker weight={task.weight} isReadOnly={true} />
      </View>

      <View style={s.buttonContainer}>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
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
    justifyContent: 'space-between',
  },
  insideContainer: {
    margin: 15,
    gap: 15,
  },
  titleContainer: {
    borderRadius: 10,
    padding: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  descriptionContainer: {
    height: 150,
    padding: 10,
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: 15,
  },

  frequencyContainer: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    // backgroundColor: '#FFFFFF',
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
    marginBottom: 15,
    borderRadius: 10,
    // backgroundColor: '#FFFFFF',
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
    // backgroundColor: '#F2F2F2',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
