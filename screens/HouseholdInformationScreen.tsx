import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-paper';

export default function HouseholdInformation() {
  return (
    <ScrollView contentContainerStyle={s.root}>
      <View style={{ padding: 14 }}>
        <Text style={s.text}>Din kod till hushållet</Text>
        <Card style={s.box}>
          <Card.Content style={{ height: 80 }}>
            <Text style={s.text}>kod</Text>
          </Card.Content>
        </Card>
        <Text style={s.text}>Ditt namn till hushållet</Text>
        <Card style={s.box}>
          <Card.Content style={{ height: 80 }}>
            <Text style={s.text}>name</Text>
          </Card.Content>
        </Card>
        <Text style={{ marginTop: 12, fontSize: 34 }}>Medlemmar:</Text>
      </View>
      <View style={s.footer}>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          textColor="black"
          theme={{ roundness: 0 }}
          icon={({ color }) => (
            <Icon source="plus-circle-outline" size={27} color={color} />
          )}
          labelStyle={{
            fontSize: 20,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
          onPress={() => {}}
        >
          Spara
        </Button>
        <Button
          style={{ width: '50%' }}
          mode="elevated"
          textColor="black"
          theme={{ roundness: 0 }}
          icon={({ color }) => (
            <Icon source="close-circle-outline" size={27} color={color} />
          )}
          labelStyle={{
            fontSize: 20,
            lineHeight: 30,
          }}
          contentStyle={{ height: 65, gap: 10 }}
          onPress={() => {
            // navigation.goBack();
          }}
        >
          Stäng
        </Button>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    marginTop: 12,
    fontSize: 24,
  },
  box: {
    width: '100%',
    marginTop: 12,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
  },
});
