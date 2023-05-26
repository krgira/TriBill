import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function FloatingWriteButton() {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate("MainDetail");
    };

    return (
        <View style={styles.wrapper}>
            <Button 
            title="새 가계부 등록하기"
            //style={styles.button}
            onPress={onPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#4974A5",
    },
    button: {

    },
});

export default FloatingWriteButton;