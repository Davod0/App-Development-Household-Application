import { PieChart } from 'react-native-gifted-charts';
import { selectCompletedTasksBySelectedHousehold } from '../store/completedTasks/completedTasksSelectors';
import { useAppSelector } from '../store/hooks';
import { selectAllMembersBySelectedHousehold } from '../store/members/membersSelectors';
import { selectActiveTasksForSelectedHousehold } from '../store/tasks/tasksSelectors';
import { useSelectedHouseholdData } from '../store/user/hooks';
import { PieChartData, Task } from '../types';

type Props = { task: Task };

export default function PieChartOneTask({ task }: Props) {
  useSelectedHouseholdData();

  const tasks = useAppSelector(selectActiveTasksForSelectedHousehold);
  const completedTasks = useAppSelector(
    selectCompletedTasksBySelectedHousehold,
  );
  const members = useAppSelector(selectAllMembersBySelectedHousehold);

  const taskWeightMap = tasks.reduce(
    (map, task) => {
      map[task.id] = task.weight;
      return map;
    },
    {} as Record<string, number>,
  );

  const memberWeightMap: Record<
    string,
    { totalWeight: number; color: string; icon: string }
  > = {};

  completedTasks.forEach((completedTask) => {
    const weight = taskWeightMap[completedTask.taskId] || 0;
    const member = members.find(
      (member) => member.id === completedTask.memberId,
    );

    if (member && weight > 0) {
      if (!memberWeightMap[member.id]) {
        memberWeightMap[member.id] = {
          totalWeight: 0,
          color: member.avatar.color,
          icon: member.avatar.icon,
        };
      }
      memberWeightMap[member.id].totalWeight += weight;
    }
  });

  const pieChartData: PieChartData[] = Object.values(memberWeightMap).map(
    (data) => ({
      value: data.totalWeight,
      color: data.color,
      text: data.icon,
    }),
  );

  return <PieChart radius={50} data={pieChartData} />;
}
