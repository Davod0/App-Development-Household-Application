import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { signOut } from 'firebase/auth';
import { Button, Pressable, StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { mockedHouseholds } from '../../data';
import { auth } from '../../firebase';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import { useAppSelector } from '../../store/hooks';
import { selectTasksForCurrentHousehold } from '../../store/tasks/tasksSelectors';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export default function Home({ navigation }: Props) {
  const tasks = useAppSelector(selectTasksForCurrentHousehold);
  const taskForTestingTaskInfoScreen = tasks[0];

  // mockedData to EditTaskScreen
  const task = {
    id: '20',
    householdId: '2020',
    name: 'Katten',
    description: 'Mata katten 2 gånger',
    weight: 4,
    frequency: 1,
    isArchived: false,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen - testing </Text>
      <Surface
        style={{ paddingVertical: 5, paddingHorizontal: 20 }}
        elevation={2}
      >
        <Text>Need to change in RootStackNavigator to test these screens.</Text>
        <Pressable onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.text}>Sign in</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.text}>Sign up</Text>
        </Pressable>
      </Surface>
      <Pressable onPress={() => navigation.navigate('ReduxTest')}>
        <Text style={styles.text}>ReduxTest</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.text}>Profile</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate('TaskInfo', {
            taskId: taskForTestingTaskInfoScreen.id,
          })
        }
      >
        <Text style={styles.text}>TaskInfo</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('CreateHouseHold')}>
        <Text style={styles.text}>CreateHouseHold</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('JoinHousehold')}>
        <Text style={styles.text}>JoinHousehold</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('CreateTask')}>
        <Text style={styles.text}>CreateTask</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('YourHouseholds')}>
        <Text style={styles.text}>YourHouseholds</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate('HouseholdInformation', {
            household: mockedHouseholds[0],
          })
        }
      >
        <Text style={styles.text}>HouseholdInformation</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('SelectedHouseholdNav')}>
        <Text style={styles.text}>SelectedHousehold</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('EditTask', { task })}>
        <Text style={styles.text}>EditTask</Text>
      </Pressable>

      {/* <Pressable onPress={() => navigation.navigate('Login')}><Text style={styles.text}>Login</Text></Pressable> */}
      <Button
        title="log out"
        onPress={() => {
          signOut(auth);
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
  },
  text: {
    fontSize: 30,
    color: 'blue',
  },
});
