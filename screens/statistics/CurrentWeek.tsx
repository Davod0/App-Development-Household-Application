import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import BigPie from '../../components/BigPie';
import SmallPie from '../../components/SmallPie';
import { mockedTasks, Task } from '../../data';

export default function CurrentWeek() {
  const householdId = 'household-1';
  const tasks = mockedTasks.filter((t) => t.householdId === householdId);

  const renderItem = (item: Task) => (
    <View style={s.item}>
      <SmallPie task={item} />
      <Text>
        {item.name.slice(0, 14).trim()}
        {item.name.length > 14 ? '...' : ''}
      </Text>
    </View>
  );
  return (
    <View style={s.container}>
      <BigPie />
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
    gap: 20,
  },
  list: {
    gap: 20,
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
