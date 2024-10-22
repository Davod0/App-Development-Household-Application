import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { CreateCompletedTask, CreateTask } from '../data';
import { selectAllCompletedTasks } from '../store/completedTasks/completedTasksSelectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectTasks } from '../store/tasks/tasksSelectors';
import { addNewTask } from '../store/tasks/tasksSlice';

export default function ReduxTestScreen() {
  const reduxTest = useAppSelector(selectAllCompletedTasks);
  const taskTest = useAppSelector(selectTasks);

  // test code to add to redux...
  const dispatch = useAppDispatch();
  const somethingToAdd: CreateCompletedTask = {
    memberId: 'member-1',
    taskId: 'task-5',
    dateDone: new Date().toUTCString(),
  };

  // test code to add a task to redux ...
  const dispatch1 = useAppDispatch();
  const addTask: CreateTask = {
    name: 'Katten',
    description: 'Ge katten mat',
    frequency: 1,
    weight: 2,
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text>ReduxTestScreen</Text>
      <Button
        mode="contained"
        // change dispatch depending on what you are testing
        onPress={() => dispatch1(addNewTask(addTask))}
      >
        add
      </Button>
      {/* == completed tasks test == */}
      {/* {reduxTest.map((task, index) => (
        <Card key={index}>
          <Card.Title title={task.id} />
          <Card.Content>
            <Text>{task.dateDone.toLocaleString()}</Text>
          </Card.Content>
        </Card>
      ))} */}
      {/* == task test == */}
      {taskTest.map((task, index) => (
        <Card key={index}>
          <Card.Title title={task.id} />
          <Card.Content>
            <Text>{task.name}</Text>
            <Text>{task.description}</Text>
            <Text>{task.frequency}</Text>
            <Text>{task.householdId}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 12,
    gap: 10,
  },
});
