import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { mockedTasks } from '../../data';
import { avatarList } from '../../library/avatarList';

export default function LastWeek() {
  const householdId = 'household-1';
  const tasks = mockedTasks.filter((t) => t.householdId === householdId);
  // const completedTasks = mockedCompletedTasks.filter(
  //   (t) => t.dateDone > Date.now(),
  // );
  const data = [
    {
      value: 30,
      color: avatarList['fox'].color,
      text: avatarList['fox'].icon,
    },
    {
      value: 30,
      color: avatarList['pig'].color,
      text: avatarList['pig'].icon,
    },
    {
      value: 30,
      color: avatarList['frog'].color,
      text: avatarList['frog'].icon,
    },
    {
      value: 30,
      color: avatarList['chicken'].color,
      text: avatarList['chicken'].icon,
    },
    {
      value: 30,
      color: avatarList['octopus'].color,
      text: avatarList['octopus'].icon,
    },
    {
      value: 30,
      color: avatarList['dolphin'].color,
      text: avatarList['dolphin'].icon,
    },
    {
      value: 30,
      color: avatarList['owl'].color,
      text: avatarList['owl'].icon,
    },
    {
      value: 30,
      color: avatarList['unicorn'].color,
      text: avatarList['unicorn'].icon,
    },
  ];
  return (
    <View style={s.container}>
      <Text>LastWeek</Text>
      <PieChart showText textSize={32} radius={150} data={data} />
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
