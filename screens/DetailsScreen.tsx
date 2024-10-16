import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ navigation }: Props) {
  return (
    <View>
      <Text variant="displaySmall">Display Medium</Text>
      <Text variant="displaySmall">Display Medium</Text>

    </View>
  );
}
