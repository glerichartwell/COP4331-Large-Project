import * as React from 'react';
import {ImageBackground, Linking, Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, HelperText, Subheading, Surface, TextInput, Title} from 'react-native-paper';
import theme from '../custom-properties/Themes';
import {auth} from "../custom-properties/firebase";

const Screen = () => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordVisibility, setPasswordVisibility] = React.useState(false);
    const [eyeCon, setEyeCon] = React.useState('eye');
    const [invalid, setInvalid] = React.useState(false);

    const handlePasswordVisibility = () => {
        console.log(eyeCon);
        if (eyeCon === 'eye') {
            setEyeCon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (eyeCon === 'eye-off') {
            setEyeCon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(login, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                setInvalid(false);
                console.log(user.email);
            })
            /*.catch(error => alert(error.message))*/
            .catch(error => setInvalid(true))
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
                    label="Email"
                    /*right={<TextInput.Icon name="check" />}*/

                    value={login}
                    error={invalid}
                    onChangeText={text => setLogin(text)}
                />
                <TextInput
                    style={styles.textInput}
                    mode="outlined"
                    label="Password"
                    right={<TextInput.Icon name={eyeCon} onPress={() => handlePasswordVisibility()}/>}

                    secureTextEntry={!passwordVisibility}
                    value={password}
                    error={invalid}
                    onChangeText={text => setPassword(text)}
                />
                <HelperText
                    type="error"
                    style={styles.invalidText}
                    visible={invalid}
                >
                    Invalid Email/Password
                </HelperText>
                <Button mode="contained" style={styles.submitButton} onPress={() => {handleLogin()}}>
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
        backgroundImage: {
            height: '100%',
            justifyContent: 'flex-end',
            marginBottom: 36
        },
        bottom: {

        },
        title1: {
            paddingTop: 100,
            marginLeft: 20,
            fontSize: 48,
            color: "white",
        },
        title2: {
            paddingTop: 20,
            paddingLeft: 20,
            marginBottom: "65%",
            fontSize: 48,
            color: "white",
        },
        surface: {
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 70
        },
        loginText: {
            fontSize: 24,
            marginTop: -25,
            marginBottom: 10
        },
        textInput: {
            width: "100%",
            marginBottom: 20,
            height: 45,
            lineHeight: 45,
        },
        invalidText:{
            fontSize: 14
        },
        submitButton: {
            marginBottom: 80,
            borderRadius: 10,
            backgroundColor: theme.colors.color4,
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
