import * as React from 'react';
import {ImageBackground, Platform, StyleSheet, Text} from 'react-native';
import {Surface, Title} from 'react-native-paper';

const Screen = () => {
    return (
        <ImageBackground source={require('../assets/images/palette_max.jpg')} style={styles.backgroundImage}>
            <Title style={styles.title1}>Hello again!</Title>
            <Title style={styles.title2}>Welcome back</Title>
        </ImageBackground>
    );
}

export default Screen;

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
        backgroundColor: 'blue'
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
    title1:{
        // height: 115,
        // width: 360,
        /*marginTop: 300,
        backgroundColor: 'black',
        marginLeft: 20,
        fontSize: 48,
        textAlign: "left",*/
        paddingTop: 100,
        paddingLeft: 20,
        fontSize: 48,
        color: "white",
    },
    title2:{
        paddingTop: 20,
        paddingLeft: 20,
        fontSize: 48,
        color: "white",
    }
});