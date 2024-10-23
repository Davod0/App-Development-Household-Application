import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { CreateHousehold } from '../data';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createHousehold } from '../store/households/householdsActions';
import { selectAllHouseholds } from '../store/households/housholdsSelectors';

export default function ReduxTestScreen() {
  // const reduxTest = useAppSelector(selectAllCompletedTasks);
  const taskTest = useAppSelector(selectAllHouseholds);

  // test code to add to redux...
  // const dispatch = useAppDispatch();
  // const somethingToAdd: CreateCompletedTask = {
  //   memberId: 'member-1',
  //   taskId: 'task-5',
  //   dateDone: new Date().toUTCString(),
  // };

  // test code to add a task to redux ...
  // const dispatch1 = useAppDispatch();
  // const addTask: CreateTask = {
  //   name: 'Katten',
  //   description: 'Ge katten mat',
  //   frequency: 2,
  //   weight: 2,
  // };
  const dispatch1 = useAppDispatch();
  const addHouse: CreateHousehold = {
    name: 'Katten',
    code: 'werewr',
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text>ReduxTestScreen</Text>
      <Button
        mode="contained"
        // change dispatch depending on what you are testing
        // onPress={() => dispatch1(addNewTask(addTask))}
        onPress={() => dispatch1(createHousehold(addHouse))}
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
      {taskTest.map((task, index) => (
        <Card key={index}>
          <Card.Title title={task.id} />
          <Card.Content>
            <Text>{task.name}</Text>
            <Text>{task.code}</Text>
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
