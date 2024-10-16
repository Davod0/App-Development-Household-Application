import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StyleSheet, View } from 'react-native';
import { Chip, Surface, Text } from 'react-native-paper';
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
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
        }}
        elevation={1}
      >
        <Text variant="displaySmall">Display Medium</Text>
      </Surface>
      <Surface
        style={{
          padding: 60,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          margin: 20,
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
        }}
        elevation={1}
      >
        <Text variant="displaySmall">Display Medium</Text>
      </Surface>
      <Surface
        style={{
          padding: 14,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          margin: 20,
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
        }}
        elevation={1}
      >
        <Chip
          onPress={() => console.log('Pressed')}
          style={{ paddingVertical: 10, paddingHorizontal: 20 }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Text variant="displaySmall" style={{ textAlign: 'left' }}>
              Återkommer
            </Text>
            <Text variant="displaySmall" style={{ textAlign: 'right' }}>
              var dag
            </Text>
          </View>
        </Chip>
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
