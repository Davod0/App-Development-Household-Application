import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { avatarList } from '../../library/avatarList';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addMember } from '../../store/members/membersActions';
import {
  addRequest,
  deleteRequest,
  getRequestsBySelectedHouseholdId,
} from '../../store/requests/actions';
import { selectAllRequestBySelectedHousehold } from '../../store/requests/selectors';
import { selectSelectedHousehold } from '../../store/user/selectors';
import { AvatarName, CreateMember, CreateRequest } from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'TestRequests'>;

export default function TestMembers({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const selectedHousehold = useAppSelector(selectSelectedHousehold);
  const requestsForSelHousehold = useAppSelector(
    selectAllRequestBySelectedHousehold,
  );

  // only used to generate a random avatar
  const nameArray: AvatarName[] = [
    'fox',
    'pig',
    'frog',
    'chicken',
    'octopus',
    'dolphin',
    'owl',
    'unicorn',
  ];

  const newMember: CreateMember = {
    householdId: selectedHousehold?.id!,
    name: 'name-' + Date.now().toString().slice(-5),
    userId: 'test-user',
    avatar: avatarList[nameArray[Math.floor(Math.random() * 8)]],
    isOwner: false,
    isAllowed: true,
  };

  const handleAdd = () => {
    dispatch(addMember(newMember))
      .unwrap()
      .then((member) => {
        const newRequest: CreateRequest = {
          memberId: member.id,
          householdId: selectedHousehold?.id!,
        };
        dispatch(addRequest(newRequest));
      });
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      {!selectedHousehold ? (
        <>
          <Text variant="bodyLarge">No selected household</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('YourHouseholds')}
          >
            Select a household
          </Button>
        </>
      ) : (
        <>
          <Text>Household name: {selectedHousehold.name}</Text>
          <Text>HouseholdID: {selectedHousehold.id}</Text>

          <Button mode="contained" onPress={handleAdd}>
            add
          </Button>
          <Button
            mode="contained"
            onPress={() => dispatch(getRequestsBySelectedHouseholdId())}
          >
            update
          </Button>

          {requestsForSelHousehold.length > 0 ? (
            requestsForSelHousehold.map((request, index) => (
              <Card key={index}>
                <Card.Title title={`Request ID: ${request.id}`} />
                <Card.Content>
                  <Text>HouseholdId: {request.householdId}</Text>
                  <Text>MemberId: {request.memberId}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button
                    mode="contained"
                    onPress={() => dispatch(deleteRequest(request))}
                  >
                    Delete
                  </Button>
                </Card.Actions>
              </Card>
            ))
          ) : (
            <Text>No requests available for this household.</Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 12,
    gap: 10,
  },
});
