import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { mockedHouseholds, mockedMembers } from '../data';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    //surface i nataive paper
    <SafeAreaView style={s.container}>
      {userHouseholds.map((household) => (
        <View style={s.household} key={household.id}>
          <Surface elevation={4}>
            <Text style={s.text}>{household.name}</Text>
          </Surface>
          <Text style={s.text}>{household.name}</Text>
          <Text style={s.text}>{household.name}</Text>
          <Text style={s.text}>{household.name}</Text>
          <Text style={s.text}>{household.name}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  household: {
    margin: 10,
    gap: 10,
    padding: 15,
  },
  text: {
    fontSize: 25,
  },
});
