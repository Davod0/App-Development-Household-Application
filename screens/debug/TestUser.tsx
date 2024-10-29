import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import { useAppSelector } from '../../store/hooks';
import { useUserAuthState } from '../../store/user/hooks';
import {
  selectCurrentUser,
  selectSelectedHousehold,
} from '../../store/user/userSelectors';

type Props = NativeStackScreenProps<RootStackParamList, 'TestUser'>;

export default function TestUser({ navigation }: Props) {
  useUserAuthState();
  const selectedHousehold = useAppSelector(selectSelectedHousehold);
  const user = useAppSelector(selectCurrentUser);
  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text>e-mail: {user?.email}</Text>
      <Text>uid: {user?.uid}</Text>
      {!selectedHousehold ? (
        <>
          <Text variant="bodyLarge">No selected household</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('YourHouseholds')}
          >
            Select household
          </Button>
        </>
      ) : (
        <>
          <Text>Household name: {selectedHousehold.name}</Text>
          <Text>HouseholdID: {selectedHousehold.id}</Text>
        </>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 12,
    gap: 10,
  },
});
