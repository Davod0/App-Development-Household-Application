import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import { useAppSelector } from '../../store/hooks';
import { selectSelectedHousehold } from '../../store/user/selectors';

type Props = NativeStackScreenProps<RootStackParamList, 'TestUser'>;

export default function TestUser({ navigation }: Props) {
  const selectedHousehold = useAppSelector(selectSelectedHousehold);
  return (
    <ScrollView contentContainerStyle={s.container}>
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

          <Text>Do something</Text>
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
