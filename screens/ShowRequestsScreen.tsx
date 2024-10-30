import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAllMembersBySelectedHousehold } from '../store/members/membersSelectors';
import {
  acceptRequest,
  rejectRequest,
} from '../store/requests/requestsActions';
import {
  selectAllRequestsOfSelectedHousehold,
  selectRequestError,
  selectRequestIsLoading,
} from '../store/requests/requestsSelectors';
import { useSelectedHouseholdData } from '../store/user/hooks';
import { Member } from '../types';

export default function ShowRequestsScreen() {
  useSelectedHouseholdData();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRequestIsLoading);
  const error = useAppSelector(selectRequestError);
  const requests = useAppSelector(selectAllRequestsOfSelectedHousehold);
  const members = useAppSelector(selectAllMembersBySelectedHousehold);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (requests && members) {
      const memberIdsInRequests = requests.map((request) => request.memberId);
      const filtered = members.filter((member) =>
        memberIdsInRequests.includes(member.id),
      );
      setFilteredMembers(filtered);
    }
  }, [requests, members]);

  const handleAccept = (memberId: string) => {
    const matchingRequest = requests.find(
      (request) => request.memberId === memberId,
    );
    if (matchingRequest) {
      dispatch(acceptRequest(matchingRequest));
    }
  };

  const handleReject = (memberId: string) => {
    const matchingRequest = requests.find((r) => r.memberId === memberId);
    if (matchingRequest) dispatch(rejectRequest(matchingRequest));
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return requests && requests.length > 0 ? (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}
          >
            <Text style={{ fontSize: 18 }}>Request from: {item.name}</Text>
            <Text style={{ color: '#666' }}>
              Household ID: {item.householdId}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Button title="Accept" onPress={() => handleAccept(item.id)} />
              <Button
                title="Reject"
                onPress={() => handleReject(item.id)}
                color="red"
              />
            </View>
          </View>
        )}
      />
    </View>
  ) : (
    <View>
      <Text>Finns inga förfrågningar!</Text>
    </View>
  );
}
