import * as React from 'react';
import {StatusBar} from 'expo-status-bar';
import {ImageBackground, Platform, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';

import Login from '../components/Login';


export default function LoginScreen() {
    return (
        <ImageBackground source={require('../assets/images/background.png')} style={styles.backgroundImage}>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
            <View style={styles.container}>
                <Login/>
            </View>
            <View style={styles.rectangle} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        // justifyContent: "center",
        // alignItems: "center",
        opacity: 1,

    },
    rectangle: {
        height: '48%',
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 99,
        top: '55%',
        left: '0%',
        borderRadius: 20,
    },
});