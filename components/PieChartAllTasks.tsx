import { PieChart } from 'react-native-gifted-charts';
import { startDayCurrentWeek } from '../library/dateFunctions';
import { selectCompletedTasksBySelectedHousehold } from '../store/completedTasks/completedTasksSelectors';
import { useAppSelector } from '../store/hooks';
import { selectAllMembersBySelectedHousehold } from '../store/members/membersSelectors';
import { selectActiveTasksForSelectedHousehold } from '../store/tasks/tasksSelectors';

type Props = {
  startDate: Date;
  endDate?: Date;
};

export default function PieChartAllTasks({ startDate }: Props) {
  const members = useAppSelector(selectAllMembersBySelectedHousehold);
  const tasks = useAppSelector(selectActiveTasksForSelectedHousehold);
  const compTasks = useAppSelector(selectCompletedTasksBySelectedHousehold);

  const completedTasksForDate = compTasks.filter(
    (t) => new Date(Date.parse(t.dateDone)) >= startDayCurrentWeek(startDate),
  );

  // chart data Dictionary: [memberId -> total_effort]
  const chartData = new Map<string, number>();
  for (let completedTask of completedTasksForDate) {
    if (!chartData.has(completedTask.memberId)) {
      chartData.set(completedTask.memberId, 0);
    }

    let task = tasks.find((t) => t.id === completedTask.taskId);
    if (!task) continue; // task is archived i.e. don't include in stats

    chartData.set(
      completedTask.memberId,
      chartData.get(completedTask.memberId)! + task.weight,
    );
  }

  // chart data array: {total_effort, color, avatar}
  const overallData: { value: number; color: string; text: string }[] = [];
  for (let memberId of chartData.keys()) {
    let avatarInfo = members.find((m) => m.id === memberId)!.avatar!;
    overallData.push({
      value: chartData.get(memberId)!,
      color: avatarInfo.color,
      text: avatarInfo.icon,
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
