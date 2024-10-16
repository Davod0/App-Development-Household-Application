import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ navigation }: Props) {
  return (
    <View>
      <Surface
        style={{
          padding: 14,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          margin: 20,
        }}
        elevation={1}
      >
        <Text variant="displaySmall">Display Medium</Text>
      </Surface>
      <Surface
        style={{
          padding: 140,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          margin: 20,
        }}
        elevation={1}
      >
        <Text variant="displaySmall">Display Medium</Text>
      </Surface>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  textInput: {
    minHeight: 60,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
  },
});
