import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { mockedHouseholds, mockedMembers } from '../data';

type Props = NativeStackScreenProps<RootStackParamList, 'YourHouseholds'>;

// kolla om inloggad antingen här eller på föregående sida dvs inloggningssidan?
const isLoggedIn = true;
const loggedInUserId = 'user-2';

export default function YourHouseholdsScreen({ navigation }: Props) {
  if (!isLoggedIn) {
    return (
      <View>
        <Text>Error, användare inte inloggad</Text>
      </View>
    );
  }

  const userHouseholds = mockedHouseholds.filter((household) =>
    mockedMembers.some(
      (member) =>
        member.userId === loggedInUserId && member.householdId === household.id,
    ),
  );

  console.log(userHouseholds);

  return (
    <View>
      <View>
        <Text>Your Households</Text>
        {userHouseholds.map((household) => (
          <View key={household.id}>
            <Text>{household.name}</Text>
          </View>
        ))}
      </View>
      <View></View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
