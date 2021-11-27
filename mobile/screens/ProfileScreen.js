import React from "react";
import {Button} from "react-native-paper";
import {StyleSheet} from "react-native";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {useNavigation} from "@react-navigation/core";
import {View} from "react-native";
import TopBar from "../components/TopBar";

const ProfileScreen = () => {
    const auth = getAuth();
    const navigation = useNavigation();
    let email;

    onAuthStateChanged(auth, (user) => {
        if (user != null) {
            email = user.email;
        } else {
            email = "";
        }
    });

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate("Login");
            })
            .catch(error => console.log(error.message))
    }

    return (
        <View>
            <TopBar title="Profile"/>
            <Button onPress={() => handleSignOut()}>Sign Out</Button>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default ProfileScreen;
