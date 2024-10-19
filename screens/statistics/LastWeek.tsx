import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { avatarList, mockedTasks } from '../../data';

export default function LastWeek() {
  const householdId = 'household-1';
  const tasks = mockedTasks.filter((t) => t.householdId === householdId);
  const a = avatarList;
  // const completedTasks = mockedCompletedTasks.filter(
  //   (t) => t.dateDone > Date.now(),
  // );
  const data = [
    { value: 30, color: a[0].color, text: a[0].icon },
    { value: 30, color: a[1].color, text: a[1].icon },
    { value: 30, color: a[2].color, text: a[2].icon },
    { value: 30, color: a[3].color, text: a[3].icon },
    { value: 30, color: a[4].color, text: a[4].icon },
    { value: 30, color: a[5].color, text: a[5].icon },
    { value: 30, color: a[6].color, text: a[6].icon },
    { value: 30, color: a[7].color, text: a[7].icon },
  ];
  return (
    <View style={s.container}>
      <Text>LastWeek</Text>
      <PieChart showText data={data} />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
