import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import PieChartAllTasks from '../../components/PieChartAllTasks';
import PieChartOneTask from '../../components/PieChartOneTask';
import { sliceStringToLengthAddEllipsis } from '../../library/utils';
import { selectCompletedTasksForPreviousMonth } from '../../store/completedTasks/completedTasksSelectors';
import { useAppSelector } from '../../store/hooks';
import { selectTasksForSelectedHousehold } from '../../store/tasks/tasksSelectors';
import { useSelectedHouseholdData } from '../../store/user/hooks';
import { Task } from '../../types';

export default function PreviousMonth() {
  useSelectedHouseholdData();
  const tasks = useAppSelector(selectTasksForSelectedHousehold);
  const compTasks = useAppSelector(selectCompletedTasksForPreviousMonth);

  // want to find all compTasks that **has been done** so we find unique taskIDs form
  // compTasks and find the corresponding task for that id.
  const taskIDs = Array.from(new Set(compTasks.map((cp) => cp.taskId)));
  const taskDone: Task[] = [];
  for (let taskId of taskIDs) {
    let t = tasks.find((task) => task.id === taskId);
    if (t) taskDone.push(t);
  }

  const renderItem = (item: Task) => {
    const compTasksDoneForTaksID = compTasks.filter(
      (task) => task.taskId === item.id,
    );

    return (
      <View style={s.item}>
        <PieChartOneTask
          taskList={compTasksDoneForTaksID}
          weight={item.weight}
        />
        <Text>{sliceStringToLengthAddEllipsis(item.name, 18)}</Text>
      </View>
    );
  };
  return (
    <View style={s.container}>
      <View style={s.chartTotal}>
        <PieChartAllTasks tasks={taskDone} completedTasks={compTasks} />
        <Text style={s.text}>Totalt</Text>
      </View>
      <FlatList
        contentContainerStyle={s.list}
        numColumns={3}
        columnWrapperStyle={s.row}
        data={taskDone}
        renderItem={(item) => renderItem(item.item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 30,
  },
  chartTotal: {
    alignItems: 'center',
    gap: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: '900',
  },
  list: {
    gap: 20,
    alignItems: 'center',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    gap: 20,
  },
  taskChats: {
    width: 300,
    flexDirection: 'row',
  },
});
