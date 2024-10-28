import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { avatarList } from '../../library/avatarList';
import { generateRandomCode } from '../../library/utils';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addHousehold,
  updateHouseholdName,
} from '../../store/households/householdsActions';
import { selectAllHouseholdsByCurrentUser } from '../../store/households/householdsSelectors';
import { selectSelectedHousehold } from '../../store/user/selectors';
import {
  CreateHousehold,
  CreateHouseholdMember,
  CreateHouseholdWithMember,
  Household,
} from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'TestHouseholds'>;

export default function TestHouseholds({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const selectedHousehold = useAppSelector(selectSelectedHousehold);
  const households = useAppSelector(selectAllHouseholdsByCurrentUser);

  const newHousehold: CreateHousehold = {
    name: 'Fam.' + Date.now().toString().slice(-3),
    code: generateRandomCode(),
  };
  const newMember: CreateHouseholdMember = {
    name: 'member no.' + Date.now().toString().slice(-3),
    userId: 'randId()',
    avatar: avatarList['octopus'],
    isOwner: true,
    isAllowed: true,
  };
  const newHouseholdWithMember: CreateHouseholdWithMember = {
    household: newHousehold,
    member: newMember,
  };

  const handelUpdate = (household: Household) => {
    const updates = {
      ...household,
      name: 'another family',
    };
    dispatch(updateHouseholdName(updates));
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
          <Button
            mode="contained"
            onPress={() => dispatch(addHousehold(newHouseholdWithMember))}
          >
            add
          </Button>

          {households.length > 0 ? (
            households.map((household, index) => (
              <Card key={index}>
                <Card.Title title={`Task ID: ${household.id}`} />
                <Card.Content>
                  <Text>Name: {household.name}</Text>
                  <Text>Code: {household.code}</Text>
                  <Text>Household ID: {household.id}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button
                    mode="contained"
                    onPress={() => handelUpdate(household)}
                  >
                    Update
                  </Button>
                </Card.Actions>
              </Card>
            ))
          ) : (
            <Text>No tasks available for this household.</Text>
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
