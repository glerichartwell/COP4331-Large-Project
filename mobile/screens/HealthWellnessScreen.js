import React from "react";
import {Text} from "react-native-paper";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {View} from "react-native";
import TopBar from "../components/TopBar";

import CustomRating from "../components/CustomRating";
import { Title } from 'react-native-paper';

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
            <Title>Sleep</Title>
            <CustomRating/>
            <Title>Mood</Title>
            <CustomRating/>
        </View>
    );
}

export default HealthWellnessScreen;
