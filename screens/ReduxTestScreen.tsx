import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { selectAllCompletedTasks } from '../store/completedTasks/completedTasksSelectors';
import { useAppSelector } from '../store/hooks';

export default function ReduxTestScreen() {
  const comTasks = useAppSelector(selectAllCompletedTasks);
  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text>ReduxTestScreen</Text>
      {comTasks.map((task, idx) => (
        <Card key={idx}>
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
