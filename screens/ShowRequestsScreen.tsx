import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { FlatList, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectAllRequests,
  selectRequestError,
} from '../store/requests/requestsSelectors';
import { Text } from 'react-native-paper';

export default function ShowRequestsScreen() {
  type Props = NativeStackScreenProps<RootStackParamList, 'ShowRequests'>;
  // const dispatch = useAppDispatch();
  const requests = useAppSelector(selectAllRequests);
  const noRequest = useAppSelector(selectRequestError);

  return !requests ? (
    <View>{noRequest}</View>
  ) : (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}
          >
            <Text style={{ fontSize: 18 }}>{item.id}</Text>
            <Text style={{ color: '#666' }}>{item.memberId}</Text>
          </View>
        )}
      />
    </View>
  );
}
