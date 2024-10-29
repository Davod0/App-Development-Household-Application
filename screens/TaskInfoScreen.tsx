import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  IconButton,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import DatePicker from '../components/DatePicker';
import EffortPicker from '../components/EffortPicker';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectMemberForUserInSelectedHousehold } from '../store/members/membersSelectors';
import { selectTaskFromTaskID } from '../store/tasks/tasksSelectors';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskInfo'>;

export default function TaskInfoScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const { taskId } = route.params;
  const task = useAppSelector(selectTaskFromTaskID(taskId));
  const isMemberOwner = useAppSelector(selectMemberForUserInSelectedHousehold);
  const dispatch = useAppDispatch();

  console.log(isMemberOwner?.isOwner);

  const handleCheckTask = () => {
    // dispatch()
    navigation.goBack();
  };

  useLayoutEffect(() => {
    if (task && isMemberOwner?.isOwner) {
      navigation.setOptions({
        headerRight: () => (
          <IconButton
            icon="pencil"
            onPress={() => navigation.navigate('EditTask', { task })}
          />
        ),
      });
    }
  }, [navigation, isMemberOwner, task]);

  if (!task) {
    return <Text>Kunde inte hitta sysslan ....</Text>;
  }

  return (
    <View style={s.container}>
      <Surface style={s.titleContainer} elevation={1}>
        <Text style={s.titleText}>{task.name}</Text>
      </Surface>

      <Surface style={s.descriptionContainer} elevation={1}>
        <ScrollView>
          <Text style={s.descriptionText}>{task.description}</Text>
        </ScrollView>
      </Surface>

      <DatePicker frequency={task.frequency} isReadOnly={true} />

      <EffortPicker weight={task.weight} isReadOnly={true} />

      <View style={s.buttonContainer}>
        <Button
          style={[s.button, { borderColor: colors.primary }]}
          icon={({ color }) => (
            <Icon source="check-outline" size={27} color={color} />
          )}
          onPress={handleCheckTask}
        >
          <Text style={s.buttonText}>Utförd</Text>
        </Button>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    margin: 15,
    gap: 15,
  },
  titleContainer: {
    borderRadius: 10,
    padding: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  descriptionContainer: {
    height: 150,
    padding: 10,
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  button: {
    borderWidth: 1,
    fontSize: 20,
    padding: 8,
    borderRadius: 230,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
