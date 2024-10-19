import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { SubHeaderStatsScreens } from '../components/SubHeaderStatsScreens';
import SelectedHouseholdScreen from '../screens/SelectedHouseholdScreen';
import CurrentWeek from '../screens/statistics/CurrentWeek';
import LastWeek from '../screens/statistics/LastWeek';

type TopTabNavigatorParamList = {
  SelectedHousehold: undefined;
  StatsCurrentWeek: undefined;
  StatsLastWeek: undefined;
};

const Tab = createMaterialTopTabNavigator<TopTabNavigatorParamList>();

export default function SelectedHouseholdTopTabNav(
  //TODO: fix type
  props: any, //MaterialTopTabBarProps,
) {
  return (
    <Tab.Navigator tabBar={(props) => <SubHeaderStatsScreens {...props} />}>
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
