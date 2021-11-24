import * as React from 'react';
import {ImageBackground, Linking, Platform, StyleSheet, Text} from 'react-native';
import {Button, Subheading, Surface, TextInput, Title} from 'react-native-paper';
import theme from '../custom-properties/Themes';

const Screen = () => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordVisibility, setPasswordVisibility] = React.useState(false);
    const [eyeCon, setEyeCon] = React.useState('eye');

    const handlePasswordVisibility = () => {
        if (eyeCon === 'eye') {
            setEyeCon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (eyeCon === 'eye-off') {
            setEyeCon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };


    return (
        <ImageBackground source={require('../assets/images/palette_max.jpg')} style={styles.backgroundImage}>
            <Title style={styles.title1}>Hello again!</Title>
            <Title style={styles.title2}>Welcome back</Title>
            <Surface style={styles.surface}>
                <Subheading style={styles.loginText}>Login</Subheading>
                <TextInput
                    style={styles.textInput}
                    mode="outlined"
                    label="Email"
                    /*right={<TextInput.Icon name="check" />}*/

                    value={login}
                    onChangeText={login => setLogin(login)}
                />
                <TextInput
                    style={styles.textInput}
                    mode="outlined"
                    label="Password"
                    right={<TextInput.Icon name={eyeCon} onPress={() => handlePasswordVisibility()}/>}

                    secureTextEntry={!passwordVisibility}
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                <Button mode="contained" style={styles.submitButton}>
                    Submit
                </Button>
                {/*<Text
                    style={styles.forgotPasswordText}
                    onPress={() => Linking.openURL('https://google.com')}>
                    Forgot password
                </Text>
                <Text style={styles.signUpText}>
                    Don't have an account? <Text
                        style={{color: theme.colors.color4}}
                        onPress={() => Linking.openURL('https://google.com')}>
                        Sign up
                    </Text>
                </Text>*/}
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
            paddingBottom: 40,
            height: 45,
        },
        submitButton: {
            borderRadius: 10,
            backgroundColor: theme.colors.color4
        },
        forgotPasswordText: {
            paddingTop: 10,
            color: theme.colors.color4,
            paddingBottom: 30,
        },
        signUpText: {
            alignSelf: "center",
        }
    }
);