import * as React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {Button, HelperText, Modal, Portal, Subheading, Surface, TextInput, Title} from 'react-native-paper';
import theme from '../custom-properties/Themes';
import {auth} from "../custom-properties/firebase";
import {onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {useNavigation} from "@react-navigation/core";

const Screen = () => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordVisibility, setPasswordVisibility] = React.useState(false);
    const [eyeCon, setEyeCon] = React.useState('eye');
    const [invalid, setInvalid] = React.useState(false);
    const [forgotPassword, setForgotPassword] = React.useState(false);
    const [forgotEmail, setForgotEmail] = React.useState('');
    const [invalidForgot, setInvalidForgot] = React.useState(false);

    const navigation = useNavigation()

    React.useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Navigating to Dashboard");
                /*navigation.navigate("Dashboard")*/
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
                console.log(user.email)
                setInvalid(false);
            })
            /*.catch(error => alert(error.message))*/
            .catch(error => setInvalid(true))
    }

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

    // TEMPORARY:
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Navigating to Login")
            })
            .catch(error => console.log(error.message))
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
        forgotPasswordPopUp: {
            backgroundColor: "white",
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
