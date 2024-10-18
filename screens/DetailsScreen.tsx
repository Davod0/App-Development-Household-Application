import { NativeStackScreenProps } from '@react-navigation/native-stack';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Surface, Text } from 'react-native-paper';
import { mockedTasks } from '../data';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ navigation }: Props) {
  const taskId = 'task-2';
  const task = mockedTasks.find((t) => t.id === taskId);

  const handleSave = () => {};

  return (
    <View style={s.container}>
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

          <View
            style={{
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
            <Text variant="headlineSmall" style={{ color: '#fff' }}>
              {task?.frequency}{' '}
            </Text>
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
      <View style={s.footer}>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          textColor="black"
          theme={{ roundness: 0 }}
          icon={({ color }) => (
            <Icon source="plus-circle-outline" size={27} color={color} />
          )}
          labelStyle={{
            fontSize: 20,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
          onPress={handleSave}
        >
          Spara
        </Button>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          textColor="black"
          theme={{ roundness: 0 }}
          icon={({ color }) => (
            <Icon source="close-circle-outline" size={27} color={color} />
          )}
          labelStyle={{
            fontSize: 20,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Stäng
        </Button>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 1,
    backgroundColor: '#F2F2F2',
  },
  textInput: {
    minHeight: 60,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
  },
});
