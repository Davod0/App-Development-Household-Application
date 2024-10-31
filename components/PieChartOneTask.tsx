import { PieChart } from 'react-native-gifted-charts';
import { useTheme } from 'react-native-paper';
import { startDayCurrentWeek, todayAtMidnight } from '../library/dateFunctions';
import { selectCompletedTasksBySelectedHousehold } from '../store/completedTasks/completedTasksSelectors';
import { useAppSelector } from '../store/hooks';
import { selectAllMembersBySelectedHousehold } from '../store/members/membersSelectors';
import { selectTasksForSelectedHousehold } from '../store/tasks/tasksSelectors';
import { CharData, Task } from '../types';

type Props = { task: Task };

export default function PieChartOneTask({ task }: Props) {
  const theme = useTheme();
  const members = useAppSelector(selectAllMembersBySelectedHousehold);
  const tasks = useAppSelector(selectTasksForSelectedHousehold).filter(
    (t) => !t.isArchived && t.id === task.id,
  );
  const compTasks = useAppSelector(selectCompletedTasksBySelectedHousehold);
  const completedTasksForDate = compTasks.filter(
    (t) =>
      new Date(Date.parse(t.dateDone)) >=
      startDayCurrentWeek(todayAtMidnight()),
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
  const overallData: CharData[] = [];
  for (let memberId of chartData.keys()) {
    let avatarInfo = members.find((m) => m.id === memberId)!.avatar!;
    overallData.push({
      value: chartData.get(memberId)!,
      color: avatarInfo.color,
      text: avatarInfo.icon,
    });
  }

  // if total effort is zero noone done any tasks so we show a gray chart w/o avatar
  const totalEffort = overallData.reduce((acc, data) => acc + data.value, 0);
  const noStatsData = [
    { value: 1, color: theme.colors.surfaceDisabled, text: '' },
  ];

  return (
    <PieChart
      radius={50}
      data={totalEffort === 0 ? noStatsData : overallData}
    />
  );
}
