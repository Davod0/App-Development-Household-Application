import React, { useEffect, useState } from 'react';
import { Button, Dialog, IconButton, Portal, Text } from 'react-native-paper';
import { Task } from '../types';

type ArchivedTaskProps = {
  task: Task;
};

export default function ArchivedTask({ task }: ArchivedTaskProps) {
  const [visible, setVisible] = useState(false);
  const [archived, setArchived] = useState(task.isArchived);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const archiveTask = () => {
    setArchived(true);
  };

  // TODO: för att se om isArchived ändras till true
  useEffect(() => {
    console.log(archived);
  }, [archived]);

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
