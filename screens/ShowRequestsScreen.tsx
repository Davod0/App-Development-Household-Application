import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store/store';

export default function ShowRequestsScreen() {
  const dispatch = useAppDispatch();
  const requests = useAppSelector(selectAllRequests);
  const loading = useAppSelector(selectRequestIsLoading);
  const error = useAppSelector(selectRequestError);

  // const createAppAsyncThunk = createAsyncThunk.withTypes<{
  //   state: RootState;
  //   dispatch: AppDispatch;
  //   rejectValue: string;
  // }>();

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
      <Text>No requests found.</Text>
    </View>
  );
}
