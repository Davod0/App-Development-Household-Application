import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectUserAuthenticationIsLoading } from '../store/user/selectors';

export default function SplashScreenVisibility() {
  const userAuthIsLoading = useAppSelector(selectUserAuthenticationIsLoading);

  useEffect(() => {
    const prevent = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    const hide = async () => {
      if (userAuthIsLoading === false) {
        await SplashScreen.hideAsync();
      }
    };

    prevent();
    hide();
  }, [userAuthIsLoading]);
}
