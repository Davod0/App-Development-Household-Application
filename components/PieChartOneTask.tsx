import { PieChart } from 'react-native-gifted-charts';
import { avatarList } from '../library/avatarList';
import { selectCompletedTasksByHousehold } from '../store/completedTasks/completedTasksSelectors';
import { useAppSelector } from '../store/hooks';
import { selectAllMembersBySelectedHousehold } from '../store/members/membersSelectors';
import { selectTasksForCurrentHousehold } from '../store/tasks/tasksSelectors';
import { useSelectedHouseholdData } from '../store/user/hooks';
import { CompletedTask, Member, PieChartData, Task } from '../types';

type Props = { task: Task };

export default function PieChartOneTask({ task }: Props) {
  useSelectedHouseholdData();

  const tasks = useAppSelector(selectTasksForCurrentHousehold);
  const completedTasks = useAppSelector(selectCompletedTasksByHousehold);
  const members = useAppSelector(selectAllMembersBySelectedHousehold);

  type comTaskWithWeight = {
    completedTask: CompletedTask;
    weight: number;
  };
  type memberWithCompletedTask = {
    member: Member;
    completedTask: CompletedTask;
    weight: number;
  };

  const taskWeightMap = tasks.reduce(
    (map, task) => {
      map[task.id] = task.weight;
      return map;
    },
    {} as Record<string, number>,
  );

  type memberWithSumOfWeight = {
    member: Member;
    weight: number;
  };

  // Skapa listan comTasksWithWeights
  const comTasksWithWeights: comTaskWithWeight[] = completedTasks.map(
    (completedTask) => {
      const weight = taskWeightMap[completedTask.taskId];
      return {
        completedTask,
        weight,
      };
    },
  );

  // Skapa en lista av typen memberWithCompletedTask
  const membersWithCompletedTasks: memberWithCompletedTask[] =
    comTasksWithWeights.reduce((acc, comTask) => {
      // Hitta rätt medlem baserat på memberId i completedTask
      const member = members.find(
        (m) => m.id === comTask.completedTask.memberId,
      );

      // Om medlemmen finns, lägg till ett objekt av typen memberWithCompletedTask
      if (member) {
        acc.push({
          member,
          completedTask: comTask.completedTask,
          weight: comTask.weight,
        });
      }
      return acc;
    }, [] as memberWithCompletedTask[]);

  const membersWithComTaskWithSumOfWeight: memberWithSumOfWeight[] =
    members.reduce((acc, member) => {
      // Hitta alla completedTasks för den här medlemmen
      const totalWeight = membersWithCompletedTasks
        .filter((x) => x.member.id === member.id) // Filtrera completedTasks som tillhör medlemmen
        .reduce((sum, x) => sum + x.weight, 0); // Summera deras weight

      // Lägg till ett objekt för den här medlemmen med totalvikt
      acc.push({
        member,
        weight: totalWeight,
      });

      return acc;
    }, [] as memberWithSumOfWeight[]);

  // membersWithComTaskWithSumOfWeight.map((x) => {
  //   console.log(`Member name: ${x.member.name}`);
  //   console.log(`Weight of task: ${x.weight}`);
  //   console.log(`____________________________`);
  // });

  const pieChartData: PieChartData[] = membersWithComTaskWithSumOfWeight.map(
    (item) => ({
      value: item.weight,
      color: item.member.avatar.color,
      text: item.member.avatar.icon,
    }),
  );

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
  return <PieChart radius={50} data={pieChartData} />;
}
