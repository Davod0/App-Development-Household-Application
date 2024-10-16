import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Icon, Text } from 'react-native-paper';
import { avatarList, mockedMembers, mockedUsers } from '../data';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const userId = 'user-2';
  const user = mockedUsers.find((u) => u.id === userId);
  const member = mockedMembers.find((m) => m.userId === userId);
  // const members = useAppSelector(selectMembersByUser);

  if (!user || !member) {
    throw new Error('bad userId: ' + userId);
  }

  const avatar = avatarList.find((a) => a.id === member.avatarId)?.icon;

  if (!avatar) {
    throw new Error('bad avatarId:' + member.avatarId);
  }

  return (
    <View style={s.container}>
      <View style={s.memberInfo}>
        <Avatar.Text size={192} label={avatar} />
        <Text style={s.name}>{user.firstName + ' ' + user.lastName}</Text>
        <Button mode="contained" onPress={() => {}}>
          Byt Hushåll
        </Button>
        <Button mode="contained" onPress={() => {}}>
          Hushålls info
        </Button>
      </View>
      <View style={s.footer}>
        <Button
          icon={({ color }) => (
            <Icon source="close-circle-outline" size={36} color={color} />
          )}
          mode="contained-tonal"
          onPress={() => {
            navigation.goBack();
          }}
          labelStyle={{
            fontSize: 24,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
        >
          Stäng
        </Button>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  memberInfo: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
  },
  footer: {
    alignSelf: 'flex-end',
    width: '50%',
  },
});
