import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function JoinHouseholdScreen(){
    const [houseCode, setHouseCode] = useState("")

    return(
        <View style={s.container}>
            <View style={{ padding: 14, gap: 14 }}>
            <TextInput 
             style={s.textInput}
            mode="outlined"
            label={'Kod till hushållet'}
            value={houseCode}

            />
            <Button mode="contained">Gå med i hushåll</Button>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
 textInput: {
    minHeight: 60,
  },
});