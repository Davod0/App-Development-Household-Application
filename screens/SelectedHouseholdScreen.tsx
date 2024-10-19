import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Badge, Button, Icon, Surface } from 'react-native-paper';
import {
  avatarList2,
  mockedCompletedTasks,
  mockedMembers,
  mockedTasks,
  Task,
} from '../data';
import { dateDifference, startDayCurrentWeek } from '../library/dateFunctions';

export default function SelectedHouseholdScreen({ navigation }: any) {
  //TODO: fix type
  // MaterialTopTabBarProps) {

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
  for (let t of tasksHousehold) {
    console.log(t.name, '---\t', t.id);
  }
  console.log('-- -- -- --');

  // const ttSet = tasksHousehold.filter(findUnique);
  // for (let t of ttSet) {
  //   console.log(t.name);
  // }

  const a = avatarList2;
  const today = new Date();
  const completedTasks = mockedCompletedTasks
    .filter((t) => members.some((m) => m.id === t.memberId))
    .filter((t) => t.dateDone >= startDayCurrentWeek(today));
  console.log('all comp. tasks this week', completedTasks.length);

  for (let t of completedTasks) {
    console.log(t);
  }
  console.log('</>');

  const tasksId = new Set(completedTasks.map((ct) => ct.taskId));

  for (let t of tasksId) {
    console.log(completedTasks.find((ct) => ct.taskId === t));
  }
  console.log('</>');

  const tasks = mockedTasks.filter((t) => tasksId.has(t.id));
  // for (let t of tasks) {
  //   console.log(t);
  // }
  //-----

  const renderTaskBadges = (task: Task) => {
    console.log(task.name, task.id);

    const memberIds = completedTasks
      .filter((t) => t.taskId === task.id)
      .map((t) => t.memberId);

    console.log('members', memberIds);
    if (memberIds.length > 0) {
      const memberAvatars = memberIds.map(
        (mId) => members.find((m) => m.id === mId)?.avatarId!,
      );
      return (
        <>
          {memberAvatars.map((x, idx) => (
            <Text key={idx}>{a[x].icon}</Text>
          ))}
        </>
      );
    } else {
      const pastCompletionsOfTask = mockedCompletedTasks
        .filter(
          (t) =>
            t.taskId === task.id && members.some((m) => m.id === t.memberId),
        )
        .sort((a, b) => (a.dateDone <= b.dateDone ? 1 : -1));

      console.log(task.id, pastCompletionsOfTask);

      let daysSinceLastCompleted;
      if (pastCompletionsOfTask.length > 0) {
        daysSinceLastCompleted = dateDifference(
          today,
          pastCompletionsOfTask[0].dateDone,
        );
      } else {
        daysSinceLastCompleted = 1000;
      }

      return (
        <>
          {daysSinceLastCompleted > 999 ? (
            <View
              style={{
                backgroundColor: 'tomato',
                borderRadius: 25,
              }}
            >
              <Icon source="infinity" size={20} color="white" />
            </View>
          ) : daysSinceLastCompleted > task.frequency ? (
            <View>
              <Badge size={24}>{daysSinceLastCompleted}</Badge>
            </View>
          ) : (
            <Text>{daysSinceLastCompleted}</Text>
          )}
        </>
      );
    }
  };
  return (
    <>
      <ScrollView style={s.container}>
        {tasksHousehold.map((task) => (
          <Pressable key={task.id} onPress={() => navigation.navigate('')}>
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
              textColor="black"
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
            textColor="black"
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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#008080aa',
    gap: 5,
  },
  taskItem: {
    // justifyContent: 'space-between',
    fontSize: 20,
  },
  header: {
    marginTop: -13,
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#008080aa',
    flexDirection: 'row',
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
