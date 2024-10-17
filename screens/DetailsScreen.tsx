import { NativeStackScreenProps } from '@react-navigation/native-stack';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { mockedTasks } from '../data';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ navigation }: Props) {
  const taskId = 'task-2';
  const task = mockedTasks.find((t) => t.id === taskId);
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
        <Text variant="displaySmall">{task?.name}</Text>
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
        <Text variant="displaySmall">{task?.description}</Text>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text variant="headlineSmall" style={{ textAlign: 'left' }}>
            Återkommer:
          </Text>

          <Text variant="headlineSmall" style={{ textAlign: 'right' }}>
            var {task?.frequency} dag
          </Text>
        </View>
      </Surface>
      <Surface
        style={{
          padding: 25,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          margin: 20,
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
        }}
        elevation={1}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <View>
            <Text
              variant="headlineSmall"
              style={{ textAlign: 'left', textAlignVertical: 'top' }}
            >
              Värde:
            </Text>
            <Text
              variant="titleSmall"
              style={{ textAlign: 'left', textAlignVertical: 'bottom' }}
            >
              Hur energikrävande är sysslan?
            </Text>
          </View>

          <Text
            variant="headlineSmall"
            style={{ textAlign: 'right', textAlignVertical: 'center' }}
          >
            {task?.weight}
          </Text>
        </View>
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
