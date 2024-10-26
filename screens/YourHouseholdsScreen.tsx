import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, IconButton, Surface, Text } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getHouseholdsByUserId } from '../store/households/householdsActions';
import { selectAllHouseholdsByCurrentUser } from '../store/households/householdsSelectors';
import { getMembersByHouseholdId } from '../store/members/membersActions';
import { selectCurrentUser } from '../store/user/selectors';
import { getMembersByCurrentUserId } from '../store/user/userActions';
import { setSelectedHousehold } from '../store/user/userReducer';
import { Household } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'YourHouseholds'>;

// kolla om inloggad antingen här eller på föregående sida dvs inloggningssidan?
export default function YourHouseholdsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const households = useAppSelector(selectAllHouseholdsByCurrentUser);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        dispatch(getMembersByCurrentUserId())
          .unwrap()
          .then(() => {
            dispatch(getHouseholdsByUserId())
              .unwrap()
              .then(() => {
                dispatch(getMembersByHouseholdId(''));
              });
          });
      }
    }, [dispatch, user]),
  );

  const handlePressHousehold = (household: Household) => {
    dispatch(setSelectedHousehold(household));
    navigation.navigate('SelectedHouseholdNav');
  };

  const handlePressInfo = (household: Household) => {
    dispatch(setSelectedHousehold(household));
    navigation.navigate('HouseholdInformation', { household });
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <View style={s.householdsContainer}>
        {households && households.length > 0 ? (
          households.map((household) => (
            <View style={s.household} key={household.id}>
              <Surface style={s.surface}>
                <TouchableOpacity
                  onPress={() => handlePressHousehold(household)}
                >
                  <Text style={s.text}>{household.name}</Text>
                </TouchableOpacity>

                <IconButton
                  icon="information-outline"
                  size={24}
                  onPress={() => handlePressInfo(household)}
                />
              </Surface>
            </View>
          ))
        ) : (
          <Text style={s.emptyText}>Inga tillgängliga hushåll</Text>
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
