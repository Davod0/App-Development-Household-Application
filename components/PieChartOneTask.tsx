import { PieChart } from 'react-native-gifted-charts';
import { avatarList } from '../library/avatarList';
import { selectCompletedTasksByHousehold } from '../store/completedTasks/completedTasksSelectors';
import { useAppSelector } from '../store/hooks';
import { selectAllMembersBySelectedHousehold } from '../store/members/membersSelectors';
import { useSelectedHouseholdData } from '../store/user/hooks';
import { PieChartData, Task } from '../types';

type Props = { task: Task };

export default function PieChartOneTask({ task }: Props) {
  useSelectedHouseholdData();

  const members = useAppSelector(selectAllMembersBySelectedHousehold);
  const completedTasks = useAppSelector(selectCompletedTasksByHousehold);

  const membersWithCompletedTaskCount = members.map((member) => {
    const memberCompletedTasks = completedTasks.filter(
      (comTask) => comTask.memberId === member.id,
    );
    return {
      member,
      completedTaskCount: memberCompletedTasks.length,
    };
  });

  membersWithCompletedTaskCount.map((memberWithComTask) =>
    console.log(
      `Member name:${memberWithComTask.member.name}| Number of comTask: ${memberWithComTask.completedTaskCount}`,
    ),
  );

  const pieChartData: PieChartData[] = membersWithCompletedTaskCount.map(
    (item) => ({
      value: item.completedTaskCount,
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
