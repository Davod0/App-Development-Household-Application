import { PieChart } from 'react-native-gifted-charts';
import { avatarList } from '../library/avatarList';
import { Task } from '../types';

type Props = { task: Task };

//TODO: implement pie chart per task
export default function PieChartOneTask({ task }: Props) {
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
