import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { View } from 'react-native';

export default function RequestsScreen() {
  type Props = NativeStackScreenProps<RootStackParamList, 'Requests'>;
  return <View></View>;
}
