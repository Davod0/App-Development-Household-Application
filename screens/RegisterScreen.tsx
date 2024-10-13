import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, TextInput } from "react-native-paper";

export default function App() {

    const [username, setUsername] = useState("");
    const [pasword, setPassword] = useState("");

    return (
        <View style={s.container}>
            <View style={{ padding: 14, gap: 14 }}>
                <TextInput style={s.textInput} mode="outlined" label={"Användarnamn"} value={username} onChangeText={text => setUsername(text)} theme={{ roundness: 10 }} />
                <TextInput style={s.textInput} mode="outlined" label={"Lösenord"} value={pasword} onChangeText={text => setPassword(text)} theme={{ roundness: 10 }} />
                <Button mode="contained" style={{ marginTop: 30 }} onPress={() => console.log("Pressed!")}>
                    Registrera konto
                </Button>

            </View>
            <View style={s.footer}>
                <Button
                    style={{ width: "50%" }}
                    mode="elevated"
                    textColor="black"
                    theme={{ roundness: 0 }}
                    icon={({ color }) => (
                        <Icon source="plus-circle-outline" size={30} color={color} />
                    )}
                    labelStyle={{
                        fontSize: 24,
                        lineHeight: 30,
                    }}
                    contentStyle={{ height: 65, gap: 10, }}
                >Spara
                </Button>
                <Button
                    style={{ width: "50%" }}
                    mode="elevated"
                    textColor="black"
                    theme={{ roundness: 0 }}
                    icon={({ color }) => (
                        <Icon source="close-circle-outline" size={30} color={color} />
                    )}
                    labelStyle={{
                        fontSize: 24,
                        lineHeight: 30,
                    }}
                    contentStyle={{ height: 65, gap: 10, }}
                >Stäng
                </Button>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        marginVertical: 1,
        // marginHorizontal: 20
    },
    textInput: {
        minHeight: 60,
    },
    footer: {
        flexDirection: "row",
        width: "100%",
        // alignSelf: "flex-end"
    }
});