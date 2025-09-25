import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, IconButton, Surface, Text } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAllHouseholdsByCurrentUser } from '../store/households/householdsSelectors';
import { useHouseholds } from '../store/user/hooks';
import { setSelectedHousehold } from '../store/user/userSlice';
import { Household } from '../types';
import { selectSelectedHousehold } from '../store/user/userSelectors';

type Props = NativeStackScreenProps<RootStackParamList, 'YourHouseholds'>;

export default function YourHouseholdsScreen({ navigation }: Props) {
  useHouseholds();
  const dispatch = useAppDispatch();
  const households = useAppSelector(selectAllHouseholdsByCurrentUser);

  const selectedHousehold = useAppSelector(selectSelectedHousehold);

  useEffect(() => {
    if (!selectedHousehold && households && households.length > 0) {
      dispatch(setSelectedHousehold(households[0]));
    }
  }, [households, selectedHousehold, dispatch]);

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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={s.text}>{household.name}</Text>
                    {selectedHousehold?.id === household.id && (
                      <IconButton
                        icon="check-circle"
                        size={24}
                        style={{ margin: 0 }}
                        disabled
                      />
                    )}
                  </View>
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
