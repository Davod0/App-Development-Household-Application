import { PieChart } from 'react-native-gifted-charts';
import { useTheme } from 'react-native-paper';
import { useAppSelector } from '../store/hooks';
import { selectAllMembersBySelectedHousehold } from '../store/members/membersSelectors';
import { CompletedTask, Task } from '../types';

type Props = {
  completedTasks: CompletedTask[];
  tasks: Task[];
};

export default function PieChartAllTasks({ completedTasks, tasks }: Props) {
  const theme = useTheme();
  const members = useAppSelector(selectAllMembersBySelectedHousehold);

  // chart data Dictionary: [memberId -> total_effort]
  const chartData = new Map<string, number>();
  for (let completedTask of completedTasks) {
    if (!chartData.has(completedTask.memberId)) {
      chartData.set(completedTask.memberId, 0);
    }

    let task = tasks.find((t) => t.id === completedTask.taskId);
    if (!task) continue;

    chartData.set(
      completedTask.memberId,
      chartData.get(completedTask.memberId)! + task.weight,
    );
  }

  // chart data array: {total_effort, color, avatar}
  const overallData: { value: number; color: string; text: string }[] = [];
  for (let memberId of chartData.keys()) {
    let avatarInfo = members.find((m) => m.id === memberId);
    if (!avatarInfo || !chartData.has(memberId)) continue;

    overallData.push({
      value: chartData.get(memberId) ?? 0,
      color: avatarInfo.avatar.color,
      text: avatarInfo.avatar.icon,
    });
  }

  // if total effort is zero noone done any tasks so we show a gray chart w/o avatar
  const totalEffort = overallData.reduce((acc, data) => acc + data.value, 0);
  const noStatsData = [
    { value: 1, color: theme.colors.surfaceDisabled, text: '' },
  ];

  return (
    <PieChart
      showText
      radius={150}
      textSize={32}
      data={totalEffort === 0 ? noStatsData : overallData}
    />
  );
}
