import React, {useState, useEffect} from "react";
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {Button, HelperText, Modal, Portal, Subheading, Surface, TextInput, Title} from 'react-native-paper';
import theme from '../custom-properties/Themes';
import {getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {useNavigation} from "@react-navigation/core";
import {SafeAreaView} from "react-native-safe-area-context";

const LoginScreen = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [eyeCon, setEyeCon] = useState('eye');
    const [invalid, setInvalid] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [invalidForgot, setInvalidForgot] = useState(false);

    const auth = getAuth();
    const navigation = useNavigation();

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate("Dashboard");
            }
        });
    }, [])

    const handlePasswordVisibility = () => {
        if (eyeCon === 'eye') {
            setEyeCon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (eyeCon === 'eye-off') {
            setEyeCon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, login, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                setInvalid(false);
            })
            /*.catch(error => alert(error.message))*/
            .catch(error => setInvalid(true))
    }

    // TEMPORARY API TEST:
    const getClients = async (event) => {

        //event.preventDefault();

        var trainerID = 'g.erichartwell@gmail.com'; //getFirebaseID()
        var obj1 = {trainerID: trainerID};
        var js = JSON.stringify(obj1);

        try {
            const response = await fetch(
                "http://192.168.208.1:5000/api/view-clients-by-trainer",
                {
                    method: "POST",
                    body: js,
                    headers: {"Content-Type": "application/json"},
                }
            );
            console.log("error");
            var txt = await response.text();
            var res = JSON.parse(txt);

            console.log(res);

            if (res.error.length > 0) {
                console.log("API Error: " + res.error);
            } else {
                console.log("Clients returned");
            }
        } catch (error) {
            console.log(error.toString());
        }
    };

    const handleForgotPassword = () => {
        sendPasswordResetEmail(auth, forgotEmail)
            .then(user => {
                hidePasswordModal();
            })
            .catch(error => {
                /*console.log(error.code)*/
                if (error.code === "auth/invalid-email") {
                    setInvalidForgot(true);
                } else {
                    hidePasswordModal();
                }
            })
    }

    const showPasswordModal = () => {
        setForgotEmail('');
        setForgotPassword(true);
        setInvalidForgot(false);
    }

    const hidePasswordModal = () => {
        setForgotEmail('');
        setForgotPassword(false);
        setInvalidForgot(false);
    }

    return (
        <ImageBackground source={require('../assets/images/palette_max.jpg')} style={styles.backgroundImage}>
            <SafeAreaView>
                <Portal>
                    <Modal
                        visible={forgotPassword}
                        onDismiss={() => hidePasswordModal()}
                        contentContainerStyle={styles.forgotPasswordPopUp}
                    >
                        <Title style={styles.forgotPasswordTitle}>
                            Forgot password?
                        </Title>
                        <TextInput
                            style={styles.textInput}
                            mode="outlined"
                            label="Email"
                            /*right={<TextInput.Icon name="check" />}*/

                            value={forgotEmail}
                            onChangeText={text => setForgotEmail(text)}
                            error={invalidForgot}
                        />
                        <Text styles={styles.forgotPasswordPopUpText}>
                            Enter the email associated with your account and we'll send you a reset password link!
                        </Text>
                        <HelperText
                            type="error"
                            style={styles.invalidText}
                            visible={invalidForgot}>
                            Invalid Email.
                        </HelperText>
                        <Button mode="contained" style={styles.submitButton} onPress={() => {
                            handleForgotPassword()
                        }}>
                            Submit
                        </Button>
                    </Modal>
                </Portal>
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
                        Invalid Email/Password.
                    </HelperText>
                    <Button mode="contained" style={styles.submitButton} onPress={() => {
                        handleLogin()
                    }}>
                        Submit
                    </Button>
                    <Text
                        style={styles.forgotPasswordText}
                        onPress={() => showPasswordModal()}
                    >
                        Forgot password?
                    </Text>
                    {/*<Text style={styles.signUpText}>
                    Don't have an account? <Text
                        style={{color: theme.colors.color4}}
                        onPress={() => Linking.openURL('https://google.com')}>
                        Sign up
                    </Text>
                </Text>*/}
                </Surface>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
        backgroundImage: {
            height: '100%',
            justifyContent: 'flex-end',
            marginBottom: 36
        },
        forgotPasswordPopUp: {
            backgroundColor: "white",
            borderRadius: 20,
            margin: 30,
            padding: 20,
        },
        forgotPasswordTitle: {
            marginBottom: 20
        },
        forgotPasswordPopUpText: {},
        bottom: {},
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
        invalidText: {
            fontSize: 14
        },
        submitButton: {
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: theme.colors.color4,
        },
        forgotPasswordText: {
            paddingTop: 10,
            color: theme.colors.color4,
            marginBottom: 10,
        },
        signUpText: {
            alignSelf: "center",
        }
    }
);

export default LoginScreen;
