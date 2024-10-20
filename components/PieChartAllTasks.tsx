import { PieChart } from 'react-native-gifted-charts';
import {
  avatarList,
  mockedCompletedTasks,
  mockedMembers,
  mockedTasks,
} from '../data';
import { startDayCurrentWeek } from '../library/dateFunctions';

type Props = {
  startDate: Date;
  endDate?: Date;
};

export default function PieChartAllTasks({ startDate, endDate }: Props) {
  const householdId = 'household-1';
  const members = mockedMembers.filter((m) => m.householdId === householdId);
  const tasks = mockedTasks.filter((t) => t.householdId === householdId);

  // filter on member to get tasks for current household
  const completedTasks = mockedCompletedTasks
    .filter((t) => members.some((m) => m.id === t.memberId))
    //TODO: date filtering is not done (this only works for current week)
    .filter((t) => t.dateDone >= startDayCurrentWeek(startDate));

  const chartData = new Map<string, number>();
  for (let completedTask of completedTasks) {
    if (!chartData.has(completedTask.memberId)) {
      chartData.set(completedTask.memberId, 0);
    }

    let task = tasks.find((t) => t.id === completedTask.taskId);
    if (!task) {
      console.error(
        'Task not found, but should exist!',
        'competedTaskId=',
        completedTask.id,
      );
      continue;
    }

    chartData.set(
      completedTask.memberId,
      chartData.get(completedTask.memberId)! + task.weight,
    );
  }

  const overallData: { value: number; color: string; text: string }[] = [];
  for (let memberId of chartData.keys()) {
    let avatarInfo = members.find((m) => m.id === memberId)?.avatarId!;
    overallData.push({
      value: chartData.get(memberId)!,
      color: avatarList[avatarInfo].color,
      text: avatarList[avatarInfo].icon,
    });
  }
  return (
    <PieChart
      showText
      radius={150}
      textSize={32}
      //   showTextBackground
      textBackgroundRadius={22}
      textBackgroundColor="#00000033"
      data={overallData}
    />
  );
}
