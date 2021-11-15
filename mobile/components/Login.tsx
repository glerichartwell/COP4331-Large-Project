import * as React from 'react';
import Colors from '../constants/Colors';

import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import {ImageBackground, StyleSheet, TouchableOpacity} from "react-native";

export default function Login(){
    return (
        <View>
            <View style={styles.welcomeContainer}>
                <Text
                    style={styles.welcomeText}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)">
                    Hello again! Welcome back
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeContainer:{
        marginVertical: 100,
        marginLeft: 20,
    },
    welcomeText:{
        fontSize: 48,
        fontFamily: 'work-sans',
        textAlign: 'left',
    },
    image:{

    }
    /*getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        fontFamily: 'montserrat',
        lineHeight: 24,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
    },*/
});