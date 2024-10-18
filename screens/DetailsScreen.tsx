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
    <View style={{ backgroundColor: '#F2F2F2' }}>
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

          <View style={{ position: 'relative' }}>
            <View
              style={{
                position: 'absolute',
                borderRadius: 15,
                borderColor: '#CD5D6F',
                borderWidth: 1,
                backgroundColor: '#CD5D6F',
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <Text variant="headlineSmall">{task?.frequency}</Text>
          </View>

          <Text variant="headlineSmall" style={{ textAlign: 'right' }}>
            dag
          </Text>
        </View>
      </Surface>
      <Surface
        style={{
          padding: 20,
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
              variant="titleMedium"
              style={{ textAlign: 'left', textAlignVertical: 'bottom' }}
            >
              Hur energikrävande är sysslan?
            </Text>
          </View>
          <View
            style={{
              borderRadius: 30,
              borderColor: '#F2F2F2',
              borderWidth: 1,
              backgroundColor: '#F2F2F2',
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              variant="headlineSmall"
              style={{
                textAlign: 'right',
              }}
            >
              {task?.weight}
            </Text>
          </View>
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
