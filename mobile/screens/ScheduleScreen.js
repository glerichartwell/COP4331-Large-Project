import React from "react";
import {Text} from "react-native-paper";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import TopBar from "../components/TopBar";
import {StyleSheet, View} from "react-native";

const ScheduleScreen = () => {
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
            <TopBar title="Schedule"/>
            <Text>Schedule</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default ScheduleScreen;
