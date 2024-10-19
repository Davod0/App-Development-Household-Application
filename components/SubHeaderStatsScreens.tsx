import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { mod } from '../library/utils';

export function SubHeaderStatsScreens({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  //   console.log(state);
  const numRoutes = state.routes.length;
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        return (
          <View
            key={index}
            style={{
              flex: isFocused ? 1 : 0,
              flexDirection: 'row',
              // justifyContent: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#aaa',
              backgroundColor: 'white',
            }}
          >
            {isFocused && (
              <View style={s.header}>
                <IconButton
                  icon="chevron-left"
                  size={24}
                  onPress={() =>
                    navigation.navigate(
                      state.routeNames[mod(state.index - 1, numRoutes)],
                    )
                  }
                />
                <Text style={s.title}>{options.title}</Text>
                <IconButton
                  icon="chevron-right"
                  size={24}
                  onPress={() =>
                    navigation.navigate(
                      state.routeNames[mod(state.index + 1, numRoutes)],
                    )
                  }
                />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
  },
});
