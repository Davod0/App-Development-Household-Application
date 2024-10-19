import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { mockedTasks } from '../data';

export default function SelectedHouseholdScreen({ navigation }: any) {
  //TODO: fix type
  // MaterialTopTabBarProps) {
  const householdId = 'household-1';
  const tasks = mockedTasks.filter((t) => t.householdId === householdId);

  return (
    <>
      <View style={s.header}>
        <Text style={{ fontSize: 20 }}>SelectedHouseholdScreen</Text>
      </View>
      <ScrollView style={s.container}>
        {tasks.map((task) => (
          <Pressable key={task.id} onPress={() => navigation.navigate('')}>
            <Surface style={s.surface}>
              <Text style={s.taskItem}>{task.name}</Text>
            </Surface>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}

const s = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#008080aa',
    gap: 5,
  },
  taskItem: {
    justifyContent: 'space-between',
    fontSize: 20,
  },
  header: {
    marginTop: -13,
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008080aa',
    flexDirection: 'row',
  },
  surface: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  left: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  right: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
