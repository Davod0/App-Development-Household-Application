import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectUserAuthenticationIsLoading } from '../store/user/selectors';

SplashScreen.preventAutoHideAsync();

export default function useSplashScreenVisibility() {
  const userAuthIsLoading = useAppSelector(selectUserAuthenticationIsLoading);

  useEffect(() => {
    const hide = async () => {
      if (userAuthIsLoading === false) {
        console.log('HIDE SPLASH');
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 300);
        // await SplashScreen.hideAsync();
      }
    };

    hide();
  }, [userAuthIsLoading]);
}
