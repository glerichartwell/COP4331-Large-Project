import React, {useState} from "react";
import {LogBox} from "react-native";
import {Provider as PaperProvider} from "react-native-paper";
import theme from "./custom-properties/Themes";
import Dashboard from "./components/Dashboard";
import LoginScreen from "./screens/LoginScreen"
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {initializeApp} from "firebase/app";
import firebaseConfig from "./custom-properties/firebase";


const app = initializeApp(firebaseConfig);
const Stack = createNativeStackNavigator();

export default function App() {
    LogBox.ignoreAllLogs(true);

    const [email, setEmail] = useState("");

    return (
        <NavigationContainer>
            <PaperProvider theme={theme}>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        options={{headerShown: false}}
                        /*component={LoginScreen}*/
                        children={() => <LoginScreen setEmail={setEmail}/>}
                    />
                    <Stack.Screen
                        name="Dashboard"
                        options={{headerShown: false}}
                        /*component={Dashboard}*/
                        children={() => <Dashboard email={email} setEmail={setEmail}/>}
                    />
                </Stack.Navigator>
            </PaperProvider>
        </NavigationContainer>
    );
}
