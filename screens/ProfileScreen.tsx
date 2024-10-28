import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Icon,
  SegmentedButtons,
  Text,
} from 'react-native-paper';
import { mockedMembers, mockedUsers } from '../data';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectColorMode } from '../store/user/selectors';
import { setColorMode } from '../store/user/userReducer';
import { ColorMode } from '../theme/ThemeProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const colorMode = useAppSelector(selectColorMode);
  const dispatch = useAppDispatch();

  const userId = 'user-2';
  const user = mockedUsers.find((u) => u.id === userId);
  const member = mockedMembers.find((m) => m.userId === userId);
  // const members = useAppSelector(selectMembersByUser);

  if (!user || !member) {
    throw new Error('bad userId: ' + userId);
  }

  const avatar = member.avatar.icon;
  const avatarColor = member.avatar.color;
  if (!avatar) {
    throw new Error('bad avatarId: ' + member.avatar);
  }

  return (
    <View style={s.container}>
      <View style={s.memberInfo}>
        <View
          style={{
            backgroundColor: avatarColor,
            width: 160,
            height: 160,
            borderRadius: 125,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar.Text
            size={230}
            label={avatar}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
        <Text style={s.name}>{user.firstName + ' ' + user.lastName}</Text>
        <Button mode="contained" onPress={() => {}}>
          Byt Hushåll
        </Button>
        <Button mode="contained" onPress={() => {}}>
          Hushålls info
        </Button>
        <SegmentedButtons
          style={{ position: 'absolute', bottom: 60, alignSelf: 'center' }}
          value={colorMode}
          onValueChange={(value) => dispatch(setColorMode(value as ColorMode))}
          buttons={[
            { value: 'light', label: 'Ljust' },
            { value: 'dark', label: 'Mörkt' },
            { value: 'auto', label: 'Enhetens' },
          ]}
        />
      </View>
      <View style={s.footer}>
        <Button
          style={{ width: '100%' }}
          mode="elevated"
          theme={{ roundness: 0 }}
          icon={({ color }) => (
            <Icon source="close-circle-outline" size={50} color={color} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -10,
  },
});
