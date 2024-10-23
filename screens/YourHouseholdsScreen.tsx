import Entypo from '@expo/vector-icons/Entypo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Household, mockedMembers } from '../data';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppSelector } from '../store/hooks';
import { selectAllHouseholds } from '../store/households/housholdsSelectors';

type Props = NativeStackScreenProps<RootStackParamList, 'YourHouseholds'>;

// kolla om inloggad antingen här eller på föregående sida dvs inloggningssidan?
const isLoggedIn = true;
const loggedInUserId = 'user-2';

export default function YourHouseholdsScreen({ navigation }: Props) {
  const ReduxMockedHousholds = useAppSelector(selectAllHouseholds);
  if (!isLoggedIn) {
    return (
      <View>
        <Text>Error, användare inte inloggad</Text>
      </View>
    );
  }

  const userHouseholds = ReduxMockedHousholds.filter((household) =>
    mockedMembers.some(
      (member) =>
        member.userId === loggedInUserId && member.householdId === household.id,
    ),
  );

  console.log(userHouseholds);

  const handleHouseholdPress = (household: Household) => {
    navigation.navigate('HouseholdInformation', { household });

    console.log(ReduxMockedHousholds);
  };
  const handleDeletePress = () => {
    navigation.navigate('Profile');
    // funktionalitet ska implementeras i denna
  };

  return (
    <SafeAreaView style={s.container}>
      {/* ta bort hushåll, eventuellt "säker på tabort?" först */}
      <View style={s.householdsContainer}>
        {userHouseholds.map((household) => (
          <View style={s.household} key={household.id}>
            <Surface style={s.surface}>
              <TouchableOpacity onPress={() => handleHouseholdPress(household)}>
                <Text style={s.text}>{household.name} 🏠</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePress()}>
                <Entypo
                  style={s.entypo}
                  name="circle-with-cross"
                  size={35}
                  color="black"
                />
              </TouchableOpacity>
            </Surface>
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
            navigation.navigate('CreateHouseHold');
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
          onPress={(member) => {
            navigation.navigate('JoinHousehold');
          }}
          // loggerInUserId (eller member), verkar skapas på nytt av ngn anledning? Scopelength?
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
    padding: 'auto',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontSize: 25,
  },
  entypo: {
    margin: 'auto',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
  },
});
