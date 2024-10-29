import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import {
  getRequestsBySelectedHouseholdId,
  acceptRequest,
  rejectRequest,
} from '../store/requests/requestsActions';
import {
  selectAllRequests,
  selectRequestIsLoading,
  selectRequestError,
} from '../store/requests/requestsSelectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function ShowRequestsScreen() {
  const dispatch = useAppDispatch();
  const requests = useAppSelector(selectAllRequests);
  const loading = useAppSelector(selectRequestIsLoading);
  const error = useAppSelector(selectRequestError);

  useEffect(() => {
    dispatch(getRequestsBySelectedHouseholdId());
  }, [dispatch]);

  const handleAccept = (request: any) => {
    dispatch(acceptRequest(request));
  };

  const handleReject = (request: any) => {
    dispatch(rejectRequest(request));
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return requests && requests.length > 0 ? (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}
          >
            {/* handle display member.name IF item.memberiD === member.iD */}
            <Text style={{ fontSize: 18 }}>Request from: {item.memberId}</Text>
            <Text style={{ color: '#666' }}>
              Household ID: {item.householdId}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Button title="Accept" onPress={() => handleAccept(item)} />
              <Button
                title="Reject"
                onPress={() => handleReject(item)}
                color="red"
              />
            </View>
          </View>
        )}
      />
    </View>
  ) : (
    <View>
      <Text>Finns inga förfrågningar, fuckfejs!</Text>
    </View>
  );
}
