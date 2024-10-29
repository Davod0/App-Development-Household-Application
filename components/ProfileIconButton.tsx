import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { IconButton } from 'react-native-paper';

type ProfileIconButtonProps = {
  navigation: NavigationProp<any>;
};

const ProfileIconButton: React.FC<ProfileIconButtonProps> = ({
  navigation,
}) => (
  <IconButton
    style={{
      position: 'absolute',
      right: 0,
      top: -30,
    }}
    icon="account"
    iconColor="#000000"
    size={30}
    onPress={() => navigation.navigate('Profile')}
  />
);

export default ProfileIconButton;
