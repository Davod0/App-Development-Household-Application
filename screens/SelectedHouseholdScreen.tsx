import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Button, Icon, Surface, Text } from 'react-native-paper';
import {
  avatarList,
  mockedCompletedTasks,
  mockedMembers,
  mockedTasks,
  Task,
} from '../data';
import { dateDifference, todayAtMidnight } from '../library/dateFunctions';
import { TopTabNavigatorParamList } from '../navigators/SelectedHouseholdTopTabNav';

type Props = MaterialTopTabScreenProps<
  TopTabNavigatorParamList,
  'SelectedHousehold'
>;

//TODO: fix type
export default function SelectedHouseholdScreen({ navigation }: Props) {
  //for testing...
  const currentUser = { isAdmin: true };
  // const currentUser = { isAdmin: false };
  const pendingRequests = ['a', 'b'];
  // const pendingRequests = [];
  const householdId = 'household-1';

  const members = mockedMembers.filter((m) => m.householdId === householdId);
  const tasksHousehold = mockedTasks.filter(
    (t) => t.householdId === householdId,
  );

  // useFocusEffect

  const today = todayAtMidnight();
  const completedTasks = mockedCompletedTasks
    .filter((t) => members.some((m) => m.id === t.memberId))
    .filter((t) => new Date(Date.parse(t.dateDone)) >= todayAtMidnight());
  // .filter((t) => t.dateDone >= startDayCurrentWeek(today));

  const renderTaskBadges = (task: Task) => {
    const memberIds = completedTasks
      .filter((t) => t.taskId === task.id)
      .map((t) => t.memberId);

    if (memberIds.length > 0) {
      const memberAvatars = memberIds.map(
        (mId) => members.find((m) => m.id === mId)?.avatarId!,
      );
      return (
        <>
          {memberAvatars.map((x, idx) => (
            <Text key={idx}>{avatarList[x].icon}</Text>
          ))}
        </>
      );
    } else {
      // we need to find when this task was done in the past
      const pastCompletionsOfThisTask = mockedCompletedTasks
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
          : 100;

      return (
        <>
          {daysSinceLastCompleted > 99 ? (
            <View>
              <Badge size={24}>99+</Badge>
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
        {tasksHousehold.map((task) => (
          <Pressable key={task.id} onPress={() => {}}>
            <Surface style={s.surface}>
              <Text style={s.taskItem}>{task.name}</Text>
              <Text style={s.taskItem}>{renderTaskBadges(task)}</Text>
            </Surface>
          </Pressable>
        ))}
      </ScrollView>
      {currentUser.isAdmin && (
        <View
          style={{
            width: '100%',
            flexDirection: pendingRequests.length > 0 ? 'row' : 'row-reverse',
          }}
        >
          {pendingRequests.length > 0 && (
            <Button
              style={{ width: '50%' }}
              mode="elevated"
              theme={{ roundness: 0 }}
              icon={({ color }) => (
                <View>
                  <Badge style={{ marginBottom: -6 }} size={14}>
                    {pendingRequests.length}
                  </Badge>
                  <Icon source="bell-outline" size={27} color={color} />
                </View>
              )}
              labelStyle={{
                fontSize: 20,
                lineHeight: 30,
              }}
              contentStyle={{ height: 65, gap: 10 }}
              onPress={() => {}}
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
              navigation.goBack();
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
    // justifyContent: 'space-between',
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
