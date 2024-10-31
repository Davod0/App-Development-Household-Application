import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Dialog, IconButton, Portal, Text } from 'react-native-paper';
import { useAppDispatch } from '../store/hooks';
import { updateTask } from '../store/tasks/tasksAction';
import { Task } from '../types';

type ArchivedTaskProps = {
  task: Task;
};

export default function ArchivedTask({ task }: ArchivedTaskProps) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const archiveTask = () => {
    dispatch(updateTask({ id: task.id, updates: { isArchived: true } }));
    navigation.goBack();
  };

  return (
    <>
      <IconButton icon="delete" onPress={showDialog} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            Är du säger på att du vill radera sysslan?
          </Dialog.Title>
          <Dialog.Content>
            <Text>{task.name}</Text>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: 'space-between' }}>
            <Button
              onPress={hideDialog}
              style={{
                padding: 6,
                borderWidth: 1,
                borderColor: '#dcd2ec',
              }}
            >
              Stäng
            </Button>
            <Button
              onPress={() => {
                archiveTask();
                hideDialog();
                navigation.goBack();
              }}
              textColor="white"
              style={{
                backgroundColor: '#cd5d6f',
                padding: 6,
              }}
            >
              Radera
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
