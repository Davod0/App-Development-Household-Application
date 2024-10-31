import { PieChart } from 'react-native-gifted-charts';
import { selectCompletedTasksByHousehold } from '../store/completedTasks/completedTasksSelectors';
import { useAppSelector } from '../store/hooks';
import { selectAllMembersBySelectedHousehold } from '../store/members/membersSelectors';
import { selectTasksForCurrentHousehold } from '../store/tasks/tasksSelectors';
import { useSelectedHouseholdData } from '../store/user/hooks';
import { PieChartData, Task } from '../types';

type Props = { task: Task };

export default function PieChartOneTask({ task }: Props) {
  useSelectedHouseholdData();
  // Hämta nödvändiga listor från state
  const members = useAppSelector(selectAllMembersBySelectedHousehold);
  const tasks = useAppSelector(selectTasksForCurrentHousehold);
  const completedTasks = useAppSelector(selectCompletedTasksByHousehold);

  // Skapa en map för att snabbt hitta vikt (weight) för varje taskId
  const taskWeightMap = tasks.reduce(
    (map, task) => {
      map[task.id] = task.weight;
      return map;
    },
    {} as Record<string, number>,
  );

  // Skapa en lista för PieChartData som ska innehålla endast medlemmar som har genomfört tasks
  const pieChartData: PieChartData[] = completedTasks.reduce(
    (acc, completedTask) => {
      // Hämta task-vikten från taskWeightMap och memberId från completedTask
      const weight = taskWeightMap[completedTask.taskId] || 0;
      const member = members.find(
        (member) => member.id === completedTask.memberId,
      );

      // Om både taskens vikt hittas och membern existerar, skapa PieChartData-objektet
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

// const pieChartData: PieChartData[] = membersWithCompletedTaskCount.map(
//   (item) => ({
//     value: item.completedTaskCount,
//     color: item.member.avatar.color,
//     text: item.member.avatar.icon,
//   }),
// );
