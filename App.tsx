import { NavigationContainer } from '@react-navigation/native';
import { useKeepAwake } from 'expo-keep-awake';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import RootStackNavigator from './navigators/RootStackNavigator';
import { store } from './store/store';

export default function App() {
  useKeepAwake(); //FIXME: REMOVE BEFORE RELEASE - JUST TO MAKE EXPOPHONEAPP STOP FUCKTARDSLEEPING CONSTANTLY.
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
