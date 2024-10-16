import { StyleSheet, Text, View } from 'react-native';
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
