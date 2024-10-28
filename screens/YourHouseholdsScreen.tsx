import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, IconButton, Surface, Text } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getAllowedHouseholdsByUserId,
  getIsNotAllowedHouseholdsByMemberId,
} from '../store/households/householdsActions';
import { selectCurrentUser } from '../store/user/selectors';
import {
  getIsAllowedMembersByCurrentUserId,
  getIsNotAllowedMembersByCurrentUserId,
} from '../store/user/userActions';
import { setSelectedHousehold } from '../store/user/userReducer';
import { Household } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'YourHouseholds'>;

export default function YourHouseholdsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [allowedHouseholds, setAllowedHouseholds] = useState<Household[]>([]);
  const [notAllowedHouseholds, setNotAllowedHouseholds] = useState<Household[]>(
    [],
  );

  useEffect(() => {
    if (user) {
      dispatch(getIsAllowedMembersByCurrentUserId())
        .unwrap()
        .then(() => {
          dispatch(getAllowedHouseholdsByUserId())
            .unwrap()
            .then((households) => {
              setAllowedHouseholds(households);
            });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

      dispatch(getIsNotAllowedMembersByCurrentUserId())
        .unwrap()
        .then((members) => {
          dispatch(getIsNotAllowedHouseholdsByMemberId(members))
            .unwrap()
            .then((households) => {
              setNotAllowedHouseholds(households);
            })
            .catch(() => {
              setNotAllowedHouseholds([]);
            });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [dispatch, user]);

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
        {allowedHouseholds.length > 0 ? (
          allowedHouseholds.map((household) => (
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
          <Surface style={s.noHouseholdSurface}>
            <Text style={[s.text]}>Inga tillgängliga hushåll</Text>
          </Surface>
        )}
        {notAllowedHouseholds.length > 0 && (
          <View>
            {notAllowedHouseholds.map((household) => (
              <View style={s.household} key={household.id}>
                <Surface style={[s.surface, s.pendingSurface]}>
                  <Text style={s.text}>
                    {household.name}
                    <Text style={{ fontSize: 12 }}>(Pending)</Text>
                  </Text>
                  <IconButton icon="information-outline" size={24} disabled />
                </Surface>
              </View>
            ))}
          </View>
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
          onPress={() => {
            navigation.navigate('JoinHousehold');
          }}
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
  pendingSurface: {
    opacity: 0.6,
  },
  text: {
    fontSize: 25,
    marginLeft: 10,
  },
  pendingText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 12,
  },
  noHouseholdSurface: {
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
  },
});
