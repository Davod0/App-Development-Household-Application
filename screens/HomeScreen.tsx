import { signOut } from 'firebase/auth';
import { Button, StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebase';
// import { mockedHouseholds, mockedMembers } from '../data';
// import { useAppSelector } from '../store/hooks';

export default function App() {
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
