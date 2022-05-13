import React from "react";
import {ActivityIndicator, Text, Surface} from "react-native-paper";
import {StyleSheet, View} from "react-native";

const CustomLoading = () => {
    return (
        <View
            style={styles.surface}
        >
            <Text style={styles.loadingText}>Loading</Text>
            <ActivityIndicator
                animating={true}
                size="large"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    surface: {
        alignContent: "center",
        top: 200
    },
    loadingText: {
        fontSize: 30,
        textAlign: "center",
    }
});

export default CustomLoading;