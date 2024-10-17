import { NativeStackScreenProps } from '@react-navigation/native-stack';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Menu, Surface, Text, TouchableRipple } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ navigation }: Props) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

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
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: '100%',
          }}
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

            <TouchableRipple onPress={openMenu}>
              <Text variant="headlineSmall" style={{ textAlign: 'right' }}>
                var dag
              </Text>
            </TouchableRipple>

            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableRipple onPress={openMenu}>
                  <Text>Open Menu</Text>
                </TouchableRipple>
              }
            >
              <Menu.Item onPress={() => {}} title="pickNumber" />
            </Menu>
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
