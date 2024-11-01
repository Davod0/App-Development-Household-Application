import { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import { useAppDispatch } from '../store/hooks';
import { updateMember } from '../store/members/membersActions';
import { Member } from '../types';

type Props = {
  member: Member;
};

export default function MakeOwnerButton({ member }: Props) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleOnPress = () => {
    const newOwner: Member = {
      ...member,
      isOwner: true,
    };
    dispatch(updateMember(newOwner));
  };

  return (
    <>
      <IconButton icon="crown-circle-outline" size={25} onPress={showDialog} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Medlem till Ägare</Dialog.Title>
          <Dialog.Content>
            <Text>Vill du göra den här medlemmen till en ägare?</Text>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: 'space-between' }}>
            <Button
              style={[s.button, { borderColor: theme.colors.primary }]}
              onPress={() => {
                hideDialog();
                handleOnPress();
              }}
            >
              <Text style={s.buttonText}>Ja</Text>
            </Button>
            <Button
              style={[s.button, { borderColor: theme.colors.primary }]}
              onPress={hideDialog}
            >
              <Text style={s.buttonText}>Nej</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const s = StyleSheet.create({
  button: {
    borderWidth: 2,
    paddingHorizontal: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 6,
  },
});
