import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function LoadingIndicator(isLoading: boolean) {
  return (
    <View>
      {isLoading ? <ActivityIndicator animating={true} size="large" /> : null}
    </View>
  );
}

// helper function to wait for a given time
export const wait = async (ms: number) => {
  console.log(`waiting for ${ms} seconds`);
  return new Promise((resolve) => setTimeout(resolve, ms));
};
