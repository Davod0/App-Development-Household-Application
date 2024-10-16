import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function HouseholdInformation() {
  return (
    <ScrollView style={s.root}>
      <Text style={s.text}>Din kod till hushållet</Text>
      <Card style={s.box}>
        <Card.Content style={{ height: 80 }}>
          <Text>kod</Text>
        </Card.Content>
      </Card>
      <Text style={s.text}>Ditt namn till hushållet</Text>
      <Card style={s.box}>
        <Card.Content style={{ height: 80 }}>
          <Text>name</Text>
        </Card.Content>
      </Card>
      <Text style={{ marginTop: 12, fontSize: 34 }}>Medlemmar:</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    padding: 14,
  },
  text: {
    marginTop: 12,
    fontSize: 24,
  },
  box: {
    width: '100%',
    marginTop: 12,
  },
});
