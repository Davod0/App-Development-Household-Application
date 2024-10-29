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
  /* 
     När applikationen startas ska alla hushåll som tillhör just den user som är inloggade hämtas från databasen.
     Och om en user går till screenen där alla user's hushåll visas,
     ska user kunna välja ett hushåll för att se informationen just om det hushållet så som 
     alla task som ska göras under dagen, statistik om nuvarande veckan och ......

    1. Här ska visas alla Task som tillhör just det valda hushållet.
    2. Varje Task ska visas i en cirkel med olika färger och varje färg tillhör en av de 7 avatars som finns i appen
       då vajre avatar är en Member i hushållet.
    3. Man ska komma åt Member objektet för att ha tillgång till avatarens namn och färg, 
        då Member objektet innehåller =  avatarId: AvatarName;

      Hämta alla task för just det hushållet som är valt, 
      Hämta alla Members för just det hushållet som är valt.
      Kolla vilken Member har gjort hur mycket av varje Task under veckan/dagen/månaden
  */

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

  // test data
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
  return <PieChart radius={50} data={data} />;
}
