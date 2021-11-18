import * as React from 'react';
import {ImageBackground, Platform, StyleSheet, Text} from 'react-native';
import {Button, Subheading, Surface, TextInput, Title} from 'react-native-paper';
import theme from '../custom-properties/Themes'

const Screen = () => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    /*let state = {
        icon: "eye",
        password: true
    };*/
    let passwordIcon = "eye";
    let showPassword = false;

    function changeIcon() {
        passwordIcon = (passwordIcon = "eye") ? "eye-off" : "eye";
        showPassword = !showPassword;
    }

    return (
        <ImageBackground source={require('../assets/images/palette_max.jpg')} style={styles.backgroundImage}>
            <Title style={styles.title1}>Hello again!</Title>
            <Title style={styles.title2}>Welcome back</Title>
            <Surface style={styles.surface}>
                <Subheading style={styles.loginText}>Login</Subheading>
                <TextInput
                    style={styles.textInput}
                    mode="outlined"
                    label="E-mail"
                    /*right={<TextInput.Icon name="check" />}*/

                    value={login}
                    onChangeText={login => setLogin(login)}
                />
                <TextInput
                    style={styles.textInput}
                    mode="outlined"
                    label="Pass-word"
                    /*right={<TextInput.Icon name={passwordIcon} onPress={() => changeIcon()}/>}*/

                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                <Button mode="contained" style={styles.submitButton}>
                    Submit
                </Button>
            </Surface>
        </ImageBackground>
    );
}

export default Screen;

const styles = StyleSheet.create({
        backgroundImage: {},
        title1: {
            paddingTop: 100,
            paddingLeft: 20,
            fontSize: 48,
            color: "white",
        },
        title2: {
            paddingTop: 20,
            paddingLeft: 20,
            fontSize: 48,
            color: "white",
        },
        surface: {
            backgroundColor: "white",
            borderRadius: 20,
            top: "30%",
            height: "50%",
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 70
        },
        loginText: {
            fontSize: 24,
            paddingBottom: 10
        },
        textInput: {
            width: "100%",
            paddingBottom: 30
        },
        submitButton: {
            borderRadius: 10,
            backgroundColor: theme.colors.color4
        },
    }
);