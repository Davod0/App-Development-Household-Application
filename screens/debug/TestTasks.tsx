import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import { getCompletedTasksByHouseholdId } from '../../store/completedTasks/completedTasksActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTask, updateTask } from '../../store/tasks/tasksAction';
import { selectTasks } from '../../store/tasks/tasksSelectors';
import { selectSelectedHousehold } from '../../store/user/selectors';
import { CreateTask } from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'TestTasks'>;

export default function TestTasks({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const selectedHousehold = useAppSelector(selectSelectedHousehold);
  const tasksForHouseholdId = useAppSelector(selectTasks);

  if (!selectedHousehold) {
    return (
      <>
        <Text variant="bodyLarge">No selected household</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('YourHouseholds')}
        >
          Select household
        </Button>
      </>
    );
  }

  /** DEFINE YOUR OBJECT */
  const newTask: CreateTask = {
    name: 'Hunden',
    description: 'Klappa hunden',
    frequency: 1,
    weight: 8,
  };

  // code to test updating a task
  const handleUpdateTask = (taskId: string) => {
    const updates = {
      name: 'Updated Hunden',
      description: 'Updated description',
      frequency: 4,
    };
    dispatch(updateTask({ id: taskId, updates }));
  };

  // code to test to "delete a task "
  /* true = 🥲(is deleted) false = 🐛 */
  const handleDeleteTask = (taskId: string) => {
    const updates = {
      isArchived: true,
    };
    dispatch(updateTask({ id: taskId, updates }));
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text variant="displaySmall">ReduxTestScreen</Text>
      {!selectedHousehold ? (
        <>
          <Text variant="bodyLarge">No selected household</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('YourHouseholds')}
          >
            Select household
          </Button>
        </>
      ) : (
        <>
          <Button mode="contained" onPress={() => dispatch(addTask(newTask))}>
            add
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              dispatch(getCompletedTasksByHouseholdId(selectedHousehold.id));
            }}
          >
            update
          </Button>

          {tasksForHouseholdId.length > 0 ? (
            tasksForHouseholdId.map((task, index) => (
              <Card key={index}>
                <Card.Title title={`Task ID: ${task.id}`} />
                <Card.Content>
                  <Text>Task name: {task.name}</Text>
                  <Text>Description: {task.description}</Text>
                  <Text>Frequency: {task.frequency}</Text>
                  <Text>Household ID: {task.householdId}</Text>
                  <Text>IsArchived: {task.isArchived ? '🥲' : '🐛'}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button
                    mode="outlined"
                    onPress={() => handleUpdateTask(task.id)}
                  >
                    Update Task
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => handleDeleteTask(task.id)}
                  >
                    Delete Task 🥲
                  </Button>
                </Card.Actions>
              </Card>
            ))
          ) : (
            <Text>No tasks available for this household.</Text>
          )}
        </>
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
