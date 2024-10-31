import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import PieChartAllTasks from '../../components/PieChartAllTasks';
import PieChartOneTask from '../../components/PieChartOneTask';
import { todayAtMidnight } from '../../library/dateFunctions';
import { sliceStringToLengthAddEllipsis } from '../../library/utils';
import { useAppSelector } from '../../store/hooks';
import { selectActiveTasksForSelectedHousehold } from '../../store/tasks/tasksSelectors';
import { useSelectedHouseholdData } from '../../store/user/hooks';
import { Task } from '../../types';

export default function CurrentWeek() {
  useSelectedHouseholdData();
  const tasks = useAppSelector(selectActiveTasksForSelectedHousehold);

  const renderItem = (item: Task) => (
    <View style={s.item}>
      <PieChartOneTask task={item} />
      <Text>{sliceStringToLengthAddEllipsis(item.name, 18)}</Text>
    </View>
  );
  return (
    <View style={s.container}>
      <View style={s.chartTotal}>
        <PieChartAllTasks startDate={todayAtMidnight()} />
        <Text style={s.text}>Totalt</Text>
      </View>
      <FlatList
        contentContainerStyle={s.list}
        numColumns={3}
        columnWrapperStyle={s.row}
        data={tasks}
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
