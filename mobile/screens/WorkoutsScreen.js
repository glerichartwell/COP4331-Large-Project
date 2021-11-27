import React from "react";
import {Text} from "react-native-paper";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {StyleSheet, View} from "react-native";
import TopBar from "../components/TopBar";

const WorkoutsScreen = () => {
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
            <TopBar title="Workouts"/>
            <Text>Workouts</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default WorkoutsScreen;
