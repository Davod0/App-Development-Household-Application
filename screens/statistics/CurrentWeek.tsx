import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import PieChartAllTasks from '../../components/PieChartAllTasks';
import PieChartOneTask from '../../components/PieChartOneTask';
import { mockedTasks } from '../../data';
import { todayAtMidnight } from '../../library/dateFunctions';
import { sliceStringToLengthAddEllipsis } from '../../library/utils';
import { useSelectedHouseholddata } from '../../store/user/hooks';
import { Task } from '../../types';

export default function CurrentWeek() {
  useSelectedHouseholddata();
  const householdId = 'household-1';
  const tasks = mockedTasks.filter((t) => t.householdId === householdId);

  const renderItem = (item: Task) => (
    <View style={s.item}>
      <PieChartOneTask task={item} />
      <Text>{sliceStringToLengthAddEllipsis(item.name, 14)}</Text>
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
  item: {},
  row: {
    gap: 20,
  },
  taskChats: {
    width: 300,
    flexDirection: 'row',
  },
});
