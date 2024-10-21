import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function LoadingIndicator(isLoading: boolean) {
  return (
    <View>
      {isLoading ? <ActivityIndicator animating={true} size="large" /> : null}
    </View>
  );
}
