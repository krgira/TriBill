import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, } from "react-native";
import { useNavigation } from "@react-navigation/native";

function FloatingWriteButton() {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate("MainDetail");
    };

    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={onPress}>
                <Text style={styles.buttonText}>새 가계부 등록하기</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4974A5",
        paddingHorizontal: 10,
        paddingVertical: 18,
        borderRadius: 10,
        
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 17,
    }
});

export default FloatingWriteButton;