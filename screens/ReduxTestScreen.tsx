import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import {
  addCompletedTask,
  getCompletedTasksByHouseholdId,
} from '../store/completedTasks/completedTasksActions';
import { selectAllCompletedTasks } from '../store/completedTasks/completedTasksSelectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAllHouseholds } from '../store/households/housholdsSelectors';
import { CreateCompletedTask, CreateHousehold, CreateTask } from '../types';

export default function ReduxTestScreen() {
  const dispatch = useAppDispatch();
  const reduxTest = useAppSelector(selectAllCompletedTasks);
  const taskTest = useAppSelector(selectAllHouseholds);

  // test code to add to redux...
  const addCompTask: CreateCompletedTask = {
    memberId: 'member-1',
    taskId: 'task-5',
    householdId: 'household-2',
    dateDone: new Date().toUTCString(),
  };

  // test code to add a task to redux ...
  const addTask: CreateTask = {
    name: 'Katten',
    description: 'Ge katten mat',
    householdId: 'household-1',
    frequency: 2,
    weight: 2,
    isArchived: false,
  };
  const addHouse: CreateHousehold = {
    name: 'Katten',
    code: 'werewr',
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text>ReduxTestScreen</Text>
      <Button
        mode="contained"
        onPress={() => dispatch(addCompletedTask(addCompTask))}
        // onPress={() => dispatch(addNewTask(addTask))}
        // onPress={() => dispatch(createHousehold(addHouse))}
      >
        add
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          dispatch(getCompletedTasksByHouseholdId('household-3'));
        }}
      >
        update
      </Button>

      {/* == completed tasks test == */}
      {reduxTest.map((task, index) => (
        <Card key={index}>
          <Card.Title title={task.id} />
          <Card.Content>
            <Text>{task.dateDone.toLocaleString()}</Text>
            <Text>{task.householdId}</Text>
          </Card.Content>
        </Card>
      ))}

      {/* == task test == */}
      {/* {taskTest.map((task, index) => (
        <Card key={index}>
          <Card.Title title={task.id} />
          <Card.Content>
            <Text>{task.name}</Text>
            <Text>{task.description}</Text>
            <Text>{task.frequency}</Text>
            <Text>{task.householdId}</Text>
          </Card.Content>
        </Card>
      ))} */}

      {/* {taskTest.map((task, index) => (
        <Card key={index}>
          <Card.Title title={task.id} />
          <Card.Content>
            <Text>{task.name}</Text>
            <Text>{task.code}</Text>
          </Card.Content>
        </Card>
      ))} */}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 12,
    gap: 10,
  },
});
