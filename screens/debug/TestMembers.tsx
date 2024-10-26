import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { avatarList } from '../../library/avatarList';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addMember,
  getMembersByHouseholdId,
  updateMember,
} from '../../store/members/membersActions';
import { selectAllMembersBySelectedHousehold } from '../../store/members/membersSelectors';
import { selectSelectedHousehold } from '../../store/user/selectors';
import { AvatarName, CreateMember, Member } from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'TestMembers'>;

export default function TestMembers({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const selectedHousehold = useAppSelector(selectSelectedHousehold);
  const membersForSelHousehold = useAppSelector(
    selectAllMembersBySelectedHousehold,
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

  const handleUpdate = (member: Member) => {
    const newMember = {
      ...member,
      isOwner: true,
      avatar: avatarList['fox'],
      name: 'Rolle ⚡',
    };
    console.log(newMember);

    dispatch(updateMember(newMember));
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

          <Button
            mode="contained"
            onPress={() => dispatch(addMember(newMember))}
          >
            add
          </Button>
          <Button
            mode="contained"
            onPress={() => dispatch(getMembersByHouseholdId())}
          >
            run thunk!
          </Button>

          {membersForSelHousehold.length > 0 ? (
            membersForSelHousehold.map((member, index) => (
              <Card key={index}>
                <Card.Title title={`Task ID: ${member.id}`} />
                <Card.Content>
                  <Text>Task name: {member.name}</Text>
                  <Text>Avatar: {member.avatar.icon}</Text>
                  <Text>Color: {member.avatar.color}</Text>
                  <Text>Household ID: {member.householdId}</Text>
                  <Text>isOwner: {member.isOwner ? '✅' : '❌'}</Text>
                  <Text>isAllowed: {member.isAllowed ? '✅' : '❌'}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button mode="contained" onPress={() => handleUpdate(member)}>
                    Update
                  </Button>
                </Card.Actions>
              </Card>
            ))
          ) : (
            <Text>No members available for this household.</Text>
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
