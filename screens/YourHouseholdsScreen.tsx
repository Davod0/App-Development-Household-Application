import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, IconButton, Surface, Text } from 'react-native-paper';
import { Household } from '../data';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getHouseholds } from '../store/households/householdsActions';
import { selectAllHouseholds } from '../store/households/housholdsSelectors';
import { selectAllMembers } from '../store/Members/membersSelectors';
import { selectCurrentUser } from '../store/user/selectors';

type Props = NativeStackScreenProps<RootStackParamList, 'YourHouseholds'>;

// kolla om inloggad antingen här eller på föregående sida dvs inloggningssidan?
export default function YourHouseholdsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const members = useAppSelector(selectAllMembers);
  const loggedInUserId = user?.uid;
  const housholdsInRedux = useAppSelector(selectAllHouseholds);

  useFocusEffect(() => {
    // dispatch(getHouseholdsByUserEmail(user?.email));
    dispatch(getHouseholds());
    // dispatch(getAllMembers());
  });

  if (!user) {
    return (
      <View>
        <Text style={s.emptyText}>Error, användare inte inloggad</Text>
      </View>
    );
  }

  const userHouseholds = housholdsInRedux.filter((household) =>
    members.some(
      (member) =>
        member.userId === loggedInUserId && member.householdId === household.id,
    ),
  );

  const handleHouseholdPress = (household: Household) => {
    navigation.navigate('HouseholdInformation', { household });
  };

  const handleDeletePress = () => {
    navigation.navigate('Profile');
    // funktionalitet ska implementeras i denna
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <View style={s.householdsContainer}>
        {userHouseholds && userHouseholds.length > 0 ? (
          userHouseholds.map((household) => (
            <View style={s.household} key={household.id}>
              <Surface style={s.surface}>
                <TouchableOpacity
                  onPress={() => handleHouseholdPress(household)}
                >
                  <Text style={s.text}>{household.name} 🏠</Text>
                </TouchableOpacity>

                <IconButton
                  icon="close-circle-outline"
                  size={24}
                  onPress={handleDeletePress}
                />
              </Surface>
            </View>
          ))
        ) : (
          <Text style={s.emptyText}>Inga tillgängliga hushåll.</Text>
        )}
      </View>
      <View style={s.footer}>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          theme={{ roundness: 0 }}
          labelStyle={{
            fontSize: 20,
          }}
          contentStyle={{ height: 65 }}
          onPress={() => {
            navigation.navigate('CreateHouseHold');
          }}
        >
          Skapa hushåll
        </Button>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          theme={{ roundness: 0 }}
          labelStyle={{
            fontSize: 20,
          }}
          contentStyle={{ height: 65 }}
          onPress={(member) => {
            navigation.navigate('JoinHousehold');
          }}
          // loggerInUserId (eller member), verkar skapas på nytt av ngn anledning? Scopelength?
        >
          Gå med i hushåll
        </Button>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  householdsContainer: {
    flex: 1,
    marginTop: 17,
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
    height: 60,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    marginLeft: 10,
  },
  emptyText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 12,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
  },
});
