import { PieChart } from 'react-native-gifted-charts';
import { avatarList, Task } from '../data';

type Props = { task: Task };

//TODO: implement pie chart per task
export default function PieChartOneTask({ task }: Props) {
  // test data
  const data = [
    { value: 30, color: avatarList[0].color, text: avatarList[0].icon },
    { value: 30, color: avatarList[1].color, text: avatarList[1].icon },
    { value: 30, color: avatarList[2].color, text: avatarList[2].icon },
    { value: 30, color: avatarList[3].color, text: avatarList[3].icon },
    { value: 30, color: avatarList[4].color, text: avatarList[4].icon },
    { value: 30, color: avatarList[5].color, text: avatarList[5].icon },
    { value: 30, color: avatarList[6].color, text: avatarList[6].icon },
    { value: 30, color: avatarList[7].color, text: avatarList[7].icon },
  ];
  return <PieChart radius={50} data={data} />;
}
