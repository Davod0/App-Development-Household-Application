import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import DoubleHeaderIcon from '../components/DoubleHeaderIcon';
import ProfileIconButton from '../components/ProfileIconButton';
import { SubHeaderStatsScreens } from '../components/SubHeaderStatsScreens';
import { sliceStringToLengthAddEllipsis } from '../library/utils';
import SelectedHouseholdScreen from '../screens/SelectedHouseholdScreen';
import CurrentWeek from '../screens/statistics/CurrentWeek';
import PreviousMonth from '../screens/statistics/PreviousMonth';
import PreviousWeek from '../screens/statistics/PreviousWeek';
import {
  selectHasStatsCompletedTasksForCurrentWeek,
  selectHasStatsCompletedTasksForPreviousMonth,
  selectHasStatsCompletedTasksForPreviousWeek,
} from '../store/completedTasks/completedTasksSelectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateSelectedHouseholdName } from '../store/households/householdsActions';
import { selectMemberForUserInSelectedHousehold } from '../store/members/membersSelectors';
import { selectSelectedHousehold } from '../store/user/userSelectors';
import { RootStackParamList } from './RootStackNavigator';

export type TopTabNavigatorParamList = {
  SelectedHousehold: undefined;
  StatsCurrentWeek: undefined;
  StatsPreviousWeek: undefined;
  StatsPreviousMonth: undefined;
};

const Tab = createMaterialTopTabNavigator<TopTabNavigatorParamList>();

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'SelectedHouseholdNav'>,
  MaterialTopTabScreenProps<TopTabNavigatorParamList>
>;

export default function SelectedHouseholdTopTabNav({ navigation }: Props) {
  const [showEditHouseholdName, setShowEditHouseholdName] = useState(false);
  const [newHouseholdName, setNewHouseholdName] = useState('');
  const selectedHousehold = useAppSelector(selectSelectedHousehold);
  const memberForSelectedHousehold = useAppSelector(
    selectMemberForUserInSelectedHousehold,
  );
  const dispatch = useAppDispatch();
  // useSelectedHousehold();

  const hasStatsForCurrentWeek = useAppSelector(
    selectHasStatsCompletedTasksForCurrentWeek,
  );
  const hasStatsForPreviousWeek = useAppSelector(
    selectHasStatsCompletedTasksForPreviousWeek,
  );
  const hasStatsForPreviousMonth = useAppSelector(
    selectHasStatsCompletedTasksForPreviousMonth,
  );

  useEffect(() => {
    navigation.setOptions({
      title: sliceStringToLengthAddEllipsis(selectedHousehold?.name, 23),
      headerRight: () => (
        <>
          {!!memberForSelectedHousehold?.isOwner ? (
            <DoubleHeaderIcon
              navigateToEditHousehold={() => setShowEditHouseholdName(true)}
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

  const handleChangeHouseholdName = () => {
    dispatch(updateSelectedHouseholdName(newHouseholdName.trim()));
    setShowEditHouseholdName(false);
    setNewHouseholdName('');
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="SelectedHousehold"
        tabBar={(props) => <SubHeaderStatsScreens {...props} />}
      >
        <Tab.Screen
          name="SelectedHousehold"
          component={SelectedHouseholdScreen}
          options={{ title: 'idag' }}
        />
        {hasStatsForCurrentWeek && (
          <Tab.Screen
            name="StatsCurrentWeek"
            component={CurrentWeek}
            options={{ title: 'nuvarande veckan' }}
          />
        )}
        {hasStatsForPreviousWeek && (
          <Tab.Screen
            name="StatsPreviousWeek"
            component={PreviousWeek}
            options={{ title: 'förra veckan' }}
          />
        )}
        {hasStatsForPreviousMonth && (
          <Tab.Screen
            name="StatsPreviousMonth"
            component={PreviousMonth}
            options={{ title: 'förra månaden' }}
          />
        )}
      </Tab.Navigator>
      <Portal>
        <Dialog
          visible={showEditHouseholdName}
          onDismiss={() => setShowEditHouseholdName(false)}
        >
          <Dialog.Title>
            <Text>Byta hushållsnamn</Text>
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={newHouseholdName}
              onChangeText={setNewHouseholdName}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowEditHouseholdName(false)}>
              Avbryt
            </Button>
            <Button
              style={{ paddingHorizontal: 30 }}
              mode="contained"
              onPress={() => handleChangeHouseholdName()}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
