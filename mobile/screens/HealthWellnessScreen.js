import React from "react";
import {Text} from "react-native-paper";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {View} from "react-native";
import TopBar from "../components/TopBar";

const HealthWellnessScreen = () => {
    const auth = getAuth();
    let email;

    onAuthStateChanged(auth, (user) => {
        if (user != null){
            email = user.email;
        }
        else {
            email = "";
        }
    });

    return (
        <View>
            <TopBar title="Health & Wellness"/>
            <Text>Health and Wellness</Text>
        </View>
    );
}

export default HealthWellnessScreen;
