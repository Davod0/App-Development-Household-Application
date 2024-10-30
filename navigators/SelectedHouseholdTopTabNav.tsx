import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import DoubleHeaderIcon from '../components/DoubleHeaderIcon';
import ProfileIconButton from '../components/ProfileIconButton';
import { SubHeaderStatsScreens } from '../components/SubHeaderStatsScreens';
import { sliceStringToLengthAddEllipsis } from '../library/utils';
import SelectedHouseholdScreen from '../screens/SelectedHouseholdScreen';
import CurrentWeek from '../screens/statistics/CurrentWeek';
import LastWeek from '../screens/statistics/LastWeek';
import { useAppSelector } from '../store/hooks';
import { selectMemberForUserInSelectedHousehold } from '../store/members/membersSelectors';
import { selectSelectedHousehold } from '../store/user/userSelectors';
import { RootStackParamList } from './RootStackNavigator';

export type TopTabNavigatorParamList = {
  SelectedHousehold: undefined;
  StatsCurrentWeek: undefined;
  StatsLastWeek: undefined;
};

const Tab = createMaterialTopTabNavigator<TopTabNavigatorParamList>();

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'SelectedHouseholdNav'>,
  MaterialTopTabScreenProps<TopTabNavigatorParamList>
>;

export default function SelectedHouseholdTopTabNav({ navigation }: Props) {
  const selectedHousehold = useAppSelector(selectSelectedHousehold);
  const memberForSelectedHousehold = useAppSelector(
    selectMemberForUserInSelectedHousehold,
  );

  useEffect(() => {
    navigation.setOptions({
      title: sliceStringToLengthAddEllipsis(selectedHousehold?.name, 23),
      headerRight: () => (
        <>
          {!!memberForSelectedHousehold?.isOwner ? (
            <DoubleHeaderIcon
              //FIXME: add navigation to edit household
              navigateToEditHousehold={() => navigation.navigate('Profile')}
              navigateToProfile={() => navigation.navigate('Profile')}
            />
          ) : (
            <ProfileIconButton
              navigateToProfile={() => navigation.navigate('Profile')}
            />
          )}
        </>
      ),
    });
  }, [navigation, selectedHousehold, memberForSelectedHousehold]);

  return (
    <Tab.Navigator
      initialRouteName="SelectedHousehold"
      tabBar={(props) => <SubHeaderStatsScreens {...props} />}
    >
      <Tab.Screen
        name="SelectedHousehold"
        component={SelectedHouseholdScreen}
        options={{ title: 'idag' }}
      />
      <Tab.Screen
        name="StatsCurrentWeek"
        component={CurrentWeek}
        options={{ title: 'nuvarande veckan' }}
      />
      <Tab.Screen
        name="StatsLastWeek"
        component={LastWeek}
        options={{ title: 'förra veckan' }}
      />
    </Tab.Navigator>
  );
}
