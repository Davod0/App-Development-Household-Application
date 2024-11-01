import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useAppSelector } from '../store/hooks';
import { selectColorMode } from '../store/user/userSelectors';
import { combinedDarkTheme, combinedLightTheme } from './theme';

export type ColorMode = 'dark' | 'light' | 'auto';

export default function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  // console.log(`Device's theme color: ${colorScheme}`);
  const colorMode = useAppSelector(selectColorMode);
  const theme =
    colorMode === 'dark' || (colorScheme === 'dark' && colorMode !== 'light')
      ? combinedDarkTheme
      : combinedLightTheme;
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <StatusBar
          style={
            colorMode === 'auto'
              ? 'auto'
              : colorMode === 'dark'
                ? 'light'
                : 'dark'
          }
        />
        {children}
      </NavigationContainer>
    </PaperProvider>
  );
}
