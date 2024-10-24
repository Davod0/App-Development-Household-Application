import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { CreateTask } from '../data';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask, getTasks } from '../store/tasks/tasksAction'; // Import addTask action
import { selectTasks } from '../store/tasks/tasksSelectors';

export default function ReduxTestScreen() {
  const taskTest = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const newTask: CreateTask = {
    name: 'Katten',
    description: 'Ge katten mat',
    frequency: 2,
    weight: 2,
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text>ReduxTestScreen</Text>
      <Button
        mode="contained"
        onPress={() => dispatch(addTask(newTask))} // Correct thunk dispatch
      >
        add
      </Button>
      {taskTest.length > 0 ? (
        taskTest.map((task, index) => (
          <Card key={index}>
            <Card.Title title={`Task ID: ${task.id}`} />
            <Card.Content>
              <Text>Name: {task.name}</Text>
              <Text>Description: {task.description}</Text>
              <Text>Frequency: {task.frequency}</Text>
              <Text>Household ID: {task.householdId}</Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text>No tasks available</Text>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 12,
    gap: 10,
  },
});
