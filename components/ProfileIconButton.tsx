import * as React from 'react';
import { IconButton } from 'react-native-paper';

type Props = {
  navigateToProfile: () => void;
};

const ProfileIconButton = ({ navigateToProfile }: Props) => (
  <IconButton
    style={{
      position: 'absolute',
      right: 0,
      top: -30,
    }}
    icon="account"
    iconColor="#000000"
    size={30}
    onPress={navigateToProfile}
  />
);

export default ProfileIconButton;
