import React from "react";
import {StyleSheet} from "react-native";
import {Provider as PaperProvider} from "react-native-paper";
import theme from "./custom-properties/Themes";

import MainScreen from "./screens/MainScreen";
import TopBar from "./components/TopBar";
import LoginScreen from "./screens/LoginScreen"
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <PaperProvider theme={theme}>
                {/* <MainScreen />*/}
                {/*<LoginScreen/>*/}
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                    <Stack.Screen name="Dashboard" component={MainScreen} />
                </Stack.Navigator>
            </PaperProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
});
