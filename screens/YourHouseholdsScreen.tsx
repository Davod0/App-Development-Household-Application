import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Household, mockedHouseholds, mockedMembers } from '../data';
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
  const handleHouseholdPress = (household: Household) => {
    navigation.navigate('HouseholdInformation', { household });
  };

  return (
    //surface i nataive paper
    <SafeAreaView style={s.container}>
      {/* ta bort hushåll, ska ligga i ännu en touchableopacity som leder till ett 
      ta bort statement hushåll från member till firebase. eventuellt "säker på tabort?" först */}
      <View style={s.householdsContainer}>
        {userHouseholds.map((household) => (
          <View style={s.household} key={household.id}>
            <TouchableOpacity onPress={() => handleHouseholdPress(household)}>
              <Surface style={s.surface}>
                <Text style={s.text}>{household.name} 🏠</Text>
              </Surface>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={s.footer}>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          textColor="black"
          theme={{ roundness: 0 }}
          labelStyle={{
            fontSize: 20,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Skapa hushåll
        </Button>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          textColor="black"
          theme={{ roundness: 0 }}
          labelStyle={{
            fontSize: 20,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Gå med i hushåll
        </Button>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  householdsContainer: {
    flex: 1,
  },
  household: {
    margin: 12,
  },
  surface: {
    elevation: 4,
    borderRadius: 10,
    paddingLeft: 10,
  },
  text: {
    fontSize: 25,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
  },
});
