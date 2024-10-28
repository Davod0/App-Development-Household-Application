import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAllRequests } from '../store/requests/requestsSelectors';

export default function ShowRequestsScreen() {
  type Props = NativeStackScreenProps<RootStackParamList, 'ShowRequests'>;
  const dispatch = useAppDispatch();
  const requests = useAppSelector(selectAllRequests);

  return <View></View>;
}
