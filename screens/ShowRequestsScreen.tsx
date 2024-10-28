import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { View } from 'react-native';

export default function ShowRequestsScreen() {
  type Props = NativeStackScreenProps<RootStackParamList, 'ShowRequests'>;
  return <View></View>;
}
