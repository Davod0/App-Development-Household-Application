import * as React from 'react';

import { IconButton } from 'react-native-paper';
//  <ProfileIconButton />

const ProfileIconButton = () => (
  <IconButton
    style={{
      position: 'absolute',
      right: 0,
      top: -30,
    }}
    icon="account"
    iconColor="#000000"
    size={30}
    onPress={() => console.log('Pressed')}
  />
);

export default ProfileIconButton;
