import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Icon,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import MakeOwnerButton from '../components/MakeOwnerButton';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { useAppSelector } from '../store/hooks';
import {
  selectAllMembersBySelectedHousehold,
  selectMemberForUserInSelectedHousehold,
} from '../store/members/membersSelectors';
import { useSelectedHouseholdData } from '../store/user/hooks';
import { selectSelectedHousehold } from '../store/user/userSelectors';

type Props = NativeStackScreenProps<RootStackParamList, 'HouseholdInformation'>;

export default function HouseholdInformationScreen({
  navigation,
  route,
}: Props) {
  useSelectedHouseholdData();
  const theme = useTheme();
  const members = useAppSelector(selectAllMembersBySelectedHousehold);

  const selectedHousehold = useAppSelector(selectSelectedHousehold);
  const membersInHousehold = members.filter((m) => m.isAllowed === true);
  const currentMember = useAppSelector(selectMemberForUserInSelectedHousehold);

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
              {membersInHousehold.length > 0 ? (
                membersInHousehold.map((member) => (
                  <List.Item
                    key={member.id}
                    titleStyle={{ textAlign: 'center' }}
                    title={
                      member.isOwner ? (
                        <View
                          style={{
                            flexDirection: 'row',
                          }}
                        >
                          <Text>{member.name}</Text>
                          <Icon
                            source="crown"
                            size={35}
                            color={theme.colors.primary}
                          />
                        </View>
                      ) : (
                        member.name
                      )
                    }
                    left={() => (
                      <Avatar.Text
                        size={72}
                        label={member.avatar.icon}
                        style={{ backgroundColor: member.avatar.color }}
                      />
                    )}
                    right={() =>
                      currentMember?.isOwner && !member.isOwner ? (
                        <View style={{ justifyContent: 'center' }}>
                          <MakeOwnerButton member={member} />
                        </View>
                      ) : null
                    }
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
