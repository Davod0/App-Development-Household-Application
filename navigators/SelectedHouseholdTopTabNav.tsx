import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import SelectedHouseholdScreen from '../screens/SelectedHouseholdScreen';
import LastWeek from '../screens/statistics/LastWeek';

type TopTabNavigatorParamList = {
  SelectedHousehold: undefined;
  StatsLastWeek: undefined;
};

const Tab = createMaterialTopTabNavigator<TopTabNavigatorParamList>();

export default function SelectedHouseholdTopTabNav(
  //TODO: fix type
  props: any, //MaterialTopTabBarProps,
) {
  const { navigation } = props;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          height: 0,
        },
        // tabBarStyle: { backgroundColor: 'transparent' },
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
      style={{
        // position: 'absolute',
        // top: 0,
        // right: 0,
        // left: 0,
        backgroundColor: 'transparent',
      }}

      // sceneContainerStyle={{ alignContent: 'center' }}
    >
      <Tab.Screen
        name="SelectedHousehold"
        component={SelectedHouseholdScreen}
        options={{
          title: 'idag',
          // tabBarShowLabe: navigation.isFocused() ? 'true' : 'false',
          // tabBarLabel: ({ focused }) => <Text>{focused ? 'hej' : 'asdf'}</Text>,
        }}
      />
      <Tab.Screen
        name="StatsLastWeek"
        component={LastWeek}
        options={{
          title: 'förra veckan',
          // tabBarLabel: (props) => <Text>{props.focused ? 'hej' : 'mupp'}</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

function MyTabBar({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        return (
          <View
            style={{
              flex: isFocused ? 1 : 0,
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#aaa',
              backgroundColor: 'transparent',
            }}
          >
            {isFocused && (
              <View style={s.header}>
                <Icon source="chevron-left" size={20} />
                <Text>{options.title}</Text>
                <Icon source="chevron-right" size={20} />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008080aa',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
