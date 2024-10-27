import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, List, Text } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppSelector } from '../store/hooks';
import { selectAllMembersBySelectedHousehold } from '../store/members/membersSelectors';
import { selectSelectedHousehold } from '../store/user/selectors';

type Props = NativeStackScreenProps<RootStackParamList, 'HouseholdInformation'>;

export default function HouseholdInformationScreen({
  navigation,
  route,
}: Props) {
  const members = useAppSelector(selectAllMembersBySelectedHousehold);
  const selectedHousehold = useAppSelector(selectSelectedHousehold);

  const membersInHousehold = members.filter(
    (m) => m.householdId === selectedHousehold?.id,
  );

  console.log('house info screen:', members.length, membersInHousehold.length);

  return (
    <ScrollView contentContainerStyle={s.root}>
      <ScrollView>
        <View style={{ padding: 14 }}>
          <Text style={s.headline}>Din kod till hushållet:</Text>
          <Card style={s.box}>
            <Card.Content>
              <Text style={s.text}>{selectedHousehold?.code}</Text>
            </Card.Content>
          </Card>
          <Text style={s.headline}>Namn till hushållet:</Text>
          <Card style={s.box}>
            <Card.Content style={{ height: 'auto', justifyContent: 'center' }}>
              <Text style={s.text}>{selectedHousehold?.name}</Text>
            </Card.Content>
          </Card>
          <Text style={{ marginTop: 12, fontSize: 34 }}>Medlemmar:</Text>
        </View>
        <ScrollView>
          <Card
            style={{
              marginTop: 12,
              borderRadius: 0,
            }}
          >
            <Card.Content
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {membersInHousehold &&
              Object.keys(membersInHousehold).length > 0 ? (
                membersInHousehold.map((member) => (
                  <List.Item
                    key={member.id}
                    style={{ width: '50%' }}
                    titleStyle={{ textAlign: 'center' }}
                    title={member.name}
                    left={(props) => (
                      <List.Icon {...props} icon="account-circle" />
                    )}
                    onPress={() => navigation.navigate('Profile')}
                  />
                ))
              ) : (
                <Text style={s.text}>Inga medlemmar är med i hushållet.</Text>
              )}
            </Card.Content>
          </Card>
        </ScrollView>
      </ScrollView>
      <View style={s.footer}>
        <Button
          style={{ width: '100%' }}
          mode="elevated"
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
            navigation.goBack();
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
    justifyContent: 'center',
    fontSize: 24,
  },
  headline: {
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
