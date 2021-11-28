import React from "react";
import {Surface, Title} from "react-native-paper";
import {StyleSheet} from "react-native";
import theme from "../custom-properties/Themes";

const TopBar = (props) => (
    <Surface style={styles.topBarSurface}>
        <Title style={styles.topBarText}>{props.title}</Title>
    </Surface>
);

const styles = StyleSheet.create({
    topBarText: {
        alignSelf: "center",
        color: "white",
        paddingBottom: 10,
    },
    topBarSurface: {
        backgroundColor: theme.colors.purple,
        paddingTop: 30,
        marginBottom: 10,
    },
});

export default TopBar;
