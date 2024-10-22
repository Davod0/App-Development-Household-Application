import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { CreateCompletedTask } from '../data';
import { selectAllCompletedTasks } from '../store/completedTasks/completedTasksSelectors';
import { addCompletedTask } from '../store/completedTasks/completedTasksSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function ReduxTestScreen() {
  const reduxTest = useAppSelector(selectAllCompletedTasks);

  // test code to add to redux...
  const dispatch = useAppDispatch();
  const somethingToAdd: CreateCompletedTask = {
    memberId: 'member-1',
    taskId: 'task-5',
    dateDone: new Date().toUTCString(),
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text>ReduxTestScreen</Text>
      <Button
        mode="contained"
        onPress={() => dispatch(addCompletedTask(somethingToAdd))}
      >
        add
      </Button>
      {reduxTest.map((task, index) => (
        <Card key={index}>
          <Card.Title title={task.id} />
          <Card.Content>
            <Text>{task.dateDone.toLocaleString()}</Text>
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
