import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Button, Icon, Surface, Text } from 'react-native-paper';
import { dateDifference, todayAtMidnight } from '../library/dateFunctions';
import { TopTabNavigatorParamList } from '../navigators/SelectedHouseholdTopTabNav';
import { useAppSelector } from '../store/hooks';

import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { selectCompletedTasksByHousehold } from '../store/completedTasks/completedTasksSelectors';
import {
  selectAllMembersBySelectedHousehold,
  selectMemberForUserInSelectedHousehold,
} from '../store/members/membersSelectors';
import { selectAllRequestsOfSelectedHousehold } from '../store/requests/requestsSelectors';
import { selectTasks } from '../store/tasks/tasksSelectors';
import { useSelectedHouseholdData } from '../store/user/hooks';
import { Task } from '../types';

// type Props = MaterialTopTabScreenProps<
//   TopTabNavigatorParamList,
//   'SelectedHousehold'
// >;

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<TopTabNavigatorParamList, 'SelectedHousehold'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function SelectedHouseholdScreen({ navigation }: Props) {
  useSelectedHouseholdData();

  const requests = useAppSelector(selectAllRequestsOfSelectedHousehold);
  const member = useAppSelector(selectMemberForUserInSelectedHousehold);
  const members = useAppSelector(selectAllMembersBySelectedHousehold);
  const tasks = useAppSelector(selectTasks);
  const competedTasks = useAppSelector(selectCompletedTasksByHousehold);

  const today = todayAtMidnight();
  const completedTasks = competedTasks
    .filter((compTask) => members.some((m) => m.id === compTask.memberId))
    .filter(
      (compTask) =>
        new Date(Date.parse(compTask.dateDone)) >= todayAtMidnight(),
    );
  // .filter((t) => t.dateDone >= startDayCurrentWeek(today));

  // FIXME: make to a component
  const renderTaskBadges = (task: Task) => {
    // get memberIds of everyone who have completed this task
    const memberIds = completedTasks
      .filter((t) => t.taskId === task.id)
      .map((t) => t.memberId);

    if (memberIds.length > 0) {
      // get the avatars
      const memberAvatars = memberIds.map(
        (mId) => members.find((m) => m.id === mId)?.avatar!,
      );
      return (
        <>
          {memberAvatars.map((x, idx) => (
            <Text key={idx}>{x.icon}</Text>
          ))}
        </>
      );
    } else {
      // we need to find when this task was done in the past
      const pastCompletionsOfThisTask = competedTasks
        .filter(
          (t) =>
            t.taskId === task.id && members.some((m) => m.id === t.memberId),
        )
        .sort((a, b) => (a.dateDone <= b.dateDone ? 1 : -1));

      let daysSinceLastCompleted =
        pastCompletionsOfThisTask.length > 0
          ? dateDifference(
              today,
              new Date(Date.parse(pastCompletionsOfThisTask[0].dateDone)),
            )
          : 10000;

      return (
        <>
          {daysSinceLastCompleted > 9999 ? (
            <View>
              <Badge size={24}>new</Badge>
            </View>
          ) : daysSinceLastCompleted > task.frequency ? (
            <View>
              <Badge size={24}>{daysSinceLastCompleted}</Badge>
            </View>
          ) : (
            <View>
              <Badge
                size={28}
                style={{
                  backgroundColor: '#f2f2f2',
                  color: 'black',
                }}
              >
                {daysSinceLastCompleted}
              </Badge>
            </View>
          )}
        </>
      );
    }
  };
  return (
    <>
      <ScrollView style={s.container}>
        {tasks.map((task) => (
          <Pressable
            key={task.id}
            onPress={() => {
              navigation.navigate('TaskInfo', { taskId: task.id });
            }}
          >
            <Surface style={s.surface}>
              <Text style={s.taskItem}>{task.name}</Text>
              <Text style={s.taskItem}>{renderTaskBadges(task)}</Text>
            </Surface>
          </Pressable>
        ))}
      </ScrollView>
      {member?.isOwner && (
        <View
          style={{
            width: '100%',
            flexDirection: requests.length > 0 ? 'row' : 'row-reverse',
          }}
        >
          {requests.length > 0 && (
            <Button
              style={{ width: '50%' }}
              mode="elevated"
              theme={{ roundness: 0 }}
              icon={({ color }) => (
                <View>
                  <Badge style={{ marginBottom: -6 }} size={14}>
                    {requests.length}
                  </Badge>
                  <Icon source="bell-outline" size={27} color={color} />
                </View>
              )}
              labelStyle={{
                fontSize: 20,
                lineHeight: 30,
              }}
              contentStyle={{ height: 65, gap: 10 }}
              onPress={() => {
                navigation.navigate('ShowRequests');
              }}
            >
              Förfrågningar
            </Button>
          )}
          <Button
            style={{ width: '50%' }}
            mode="elevated"
            theme={{ roundness: 0 }}
            icon={({ color }) => (
              <Icon source="plus-circle-outline" size={27} color={color} />
            )}
            labelStyle={{
              fontSize: 20,
              lineHeight: 30,
            }}
            contentStyle={{ height: 65, gap: 10 }}
            onPress={() => {
              navigation.navigate('CreateTask');
            }}
          >
            Skapa syssla
          </Button>
        </View>
      )}
    </>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 5,
  },
  taskItem: {
    fontSize: 20,
  },
  surface: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  left: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  right: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  footer: {
    width: '100%',
  },
});
