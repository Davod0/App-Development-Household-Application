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

  const pieChartData: PieChartData[] = completedTasks.reduce(
    (acc, completedTask) => {
      const weight = taskWeightMap[completedTask.taskId] || 0;
      const member = members.find(
        (member) => member.id === completedTask.memberId,
      );

      if (member && weight > 0) {
        acc.push({
          value: weight,
          color: member.avatar.color,
          text: member.avatar.icon,
        });
      }
      return acc;
    },
    [] as PieChartData[],
  );

  return <PieChart radius={50} data={pieChartData} />;
}
