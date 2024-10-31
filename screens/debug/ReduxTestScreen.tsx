import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { RootStackParamList } from '../../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ReduxTest'>;

export default function ReduxTestScreen({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={s.container}>
      <Button mode="contained" onPress={() => navigation.navigate('TestUser')}>
        User
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('TestTasks')}>
        Tasks
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TestMembers')}
      >
        Members
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TestHouseholds')}
      >
        Households
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TestCompTasks')}
      >
        CompTasks
      </Button>
      <Button
        disabled // not implemented yet
        mode="contained"
        onPress={() => navigation.navigate('TestCompTasks')}
      >
        ScheduledTasks
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TestRequests')}
      >
        Requests
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('YourHouseholds')}
      >
        Home Screen
      </Button>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 12,
    gap: 10,
  },
});
