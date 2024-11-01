import { useKeepAwake } from 'expo-keep-awake';
import { Provider } from 'react-redux';
import RootStackNavigator from './navigators/RootStackNavigator';
import { store } from './store/store';
import ThemeProvider from './theme/ThemeProvider';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootStackNavigator />
      </ThemeProvider>
    </Provider>
  );
}
