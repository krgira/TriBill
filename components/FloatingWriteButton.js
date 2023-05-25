import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Ionicons  } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

function FloatingWriteButton() {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate("MainDetail");
    };

    return (
        <View style={styles.wrapper}>
            <Pressable style={({pressed}) => [
                styles.button,
                Platform.OS === 'ios' && {
                    opacity: pressed ? 0.6 : 1,
                },
            ]}
            android_ripple={{color: 'white'}}
            onpress={onPress}>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 16,
        right:16,
        width: 56,
        height: 56,
        borderRadius: 28,
        // ios 전용 그림자
        shadowColor: '#4d4d4d',
        shadowOffset: {width:0, height:4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // android 전용 그림자
        elevation: 5,
        overflow: Platform.select({android: 'hidden'}),
    },
    button: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#009688',
        justifyContent: 'center',
        alignContent: 'center',
    },
    icon: {
        color: 'white',
    },
});

export default FloatingWriteButton;