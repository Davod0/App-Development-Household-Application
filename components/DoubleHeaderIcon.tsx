import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';

type Props = {
  navigateToEditHousehold: () => void;
  navigateToProfile: () => void;
};

export default function DoubleHeaderIcon({
  navigateToEditHousehold,
  navigateToProfile,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
      }}
    >
      <IconButton
        icon="home-edit"
        size={30}
        style={s.headerIcon}
        // FIXME: #118 add navigation!
        onPress={navigateToEditHousehold}
      />
      <IconButton
        icon="account"
        size={30}
        style={s.headerIcon}
        onPress={navigateToProfile}
      />
    </View>
  );
}

const s = StyleSheet.create({
  headerIcon: {
    width: 30,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
});
