import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  createHousehold,
  CreateHouseholdWithMember,
} from '../store/households/householdsActions';
import { selectAllHouseholds } from '../store/households/housholdsSelectors';
import { selectAllMembers } from '../store/Members/membersSelectors';
import { selectCurrentUser } from '../store/user/selectors';

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

  const user = useAppSelector(selectCurrentUser);
  const households = useAppSelector(selectAllHouseholds);
  const members = useAppSelector(selectAllMembers);
  const dispatch1 = useAppDispatch();
  const addHouse: CreateHouseholdWithMember = {
    household: {
      name: 'Katten',
      code: 'werewr',
    },
    member: {
      name: 'Kalle',
      userId: user!.uid,
      householdId: '',
      avatarId: 'fox',
      isOwner: true,
      isAllowed: true,
    },
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
      {members.map((member, index) => (
        <Card key={index}>
          <Card.Title title={member.id} />
          <Card.Content>
            <Text>{member.id}</Text>
            <Text>{member.name}</Text>
            <Text>{member.householdId}</Text>
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
