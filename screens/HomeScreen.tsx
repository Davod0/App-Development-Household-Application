import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { signOut } from 'firebase/auth';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebase';
import { RootStackParamList } from '../navigators/RootStackNavigator';
// import { mockedHouseholds, mockedMembers } from '../data';
// import { useAppSelector } from '../store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export default function Home({ navigation }: Props) {
  // const households = useAppSelector((state) => state.household.list);
  // const members = useAppSelector((state) => state.members.filter());
  // const householdMembers = useAppSelector(selectMembersByHousehold);
  // const userMembers = useAppSelector(selectMembersByUser);

  // const userHouseholds = mockedHouseholds.filter((household) =>
  //   mockedMembers.some(
  //     (member) =>
  //       member.userId === loggedInUserId && member.householdId === household.id,
  //   ),
  // );

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.text}>Profile</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('TestStore')}>
        <Text style={styles.text}>TestStore</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('CreateHouseHold')}>
        <Text style={styles.text}>CreateHouseHold</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('JoinHousehold')}>
        <Text style={styles.text}>JoinHousehold</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('CreateTask')}>
        <Text style={styles.text}>CreateTask</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('HouseholdInformation')}>
        <Text style={styles.text}>HouseholdInformation</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate('SelectedHouseholdNav', {
            screen: 'SelectedHousehold',
          })
        }
      >
        <Text style={styles.text}>SelectedHousehold</Text>
      </Pressable>

      {/* <Pressable onPress={() => navigation.navigate('Login')}><Text style={styles.text}>Login</Text></Pressable> */}
      <Text>Home Screen</Text>
      <Button
        title="log out"
        onPress={() => {
          signOut(auth);
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
  },
});
