import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { CreateTask } from '../data';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask, updateTask } from '../store/tasks/tasksAction';
import {
  selectTasks,
  selectTasksFromHouseholdId,
} from '../store/tasks/tasksSelectors';

export default function ReduxTestScreen() {
  // const reduxTest = useAppSelector(selectAllCompletedTasks);
  const taskTest = useAppSelector(selectTasks);
  const tasksForHouseholdId = useAppSelector(
    selectTasksFromHouseholdId('1111'),
  );

  // test code to add a task to redux ...
  const dispatch = useAppDispatch();
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

  // const user = useAppSelector(selectCurrentUser);
  // const households = useAppSelector(selectAllHouseholds);
  // const members = useAppSelector(selectAllMembers);
  // const dispatch1 = useAppDispatch();
  // const addHouse: CreateHouseholdWithMember = {
  //   household: {
  //     name: 'Katten',
  //     code: 'werewr',
  //   },
  //   member: {
  //     name: 'Kalle',
  //     userId: user!.uid,
  //     householdId: '',
  //     avatarId: 'fox',
  //     isOwner: true,
  //     isAllowed: true,
  //   },
  // };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text>ReduxTestScreen</Text>
      <Button
        mode="contained"
        // change dispatch depending on what you are testing
        onPress={() => dispatch(addTask(newTask))}
        // onPress={() => dispatch1(createHousehold(addHouse))}
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
            <Button mode="contained" onPress={() => handleUpdateTask(task.id)}>
              Update Task
            </Button>
            <Button mode="contained" onPress={() => handleDeleteTask(task.id)}>
              Delete Task 🥲
            </Button>
          </Card>
        ))
      ) : (
        <Text>No tasks available for this household.</Text>
      )}
      {/* {taskTest.map((task, index) => (
        <Card key={index}>
          <Card.Title title={task.id} />
          <Card.Content>
            <Text>{task.name}</Text>
            <Text>{task.code}</Text>
          </Card.Content>
        </Card>
      ))}
      {members.map((member, index) => (
        <Card key={index}>
          <Card.Title title={member.id} />
          <Card.Content>
            <Text>{member.id}</Text>
            <Text>{member.name}</Text>
            <Text>{member.householdId}</Text>
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
