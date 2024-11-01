import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useAppDispatch } from '../store/hooks';
import { updateMember } from '../store/members/membersActions';
import { Member } from '../types';

type Props = {
  member: Member;
};

export default function MakeOwnerButton({ member }: Props) {
  //   const [memberIsOwner, setMemberIsOwner] = useState(member.isOwner);
  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    const newOwner: Member = {
      ...member,
      isOwner: true,
    };
    dispatch(updateMember(newOwner));
  };

  return (
    <View style={s.container}>
      <IconButton
        icon="crown-circle-outline"
        size={25}
        onPress={handleOnPress}
      ></IconButton>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
