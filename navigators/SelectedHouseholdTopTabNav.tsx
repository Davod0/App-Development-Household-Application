import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SubHeaderStatsScreens } from '../Components/SubHeaderStatsScreens';
import SelectedHouseholdScreen from '../screens/SelectedHouseholdScreen';
import CurrentWeek from '../screens/statistics/CurrentWeek';
import LastWeek from '../screens/statistics/LastWeek';
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

export default function SelectedHouseholdTopTabNav(props: Props) {
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
