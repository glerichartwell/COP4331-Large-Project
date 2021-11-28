import React, {useEffect, useState} from "react";
import {Button, Text, Avatar} from "react-native-paper";
import {StyleSheet} from "react-native";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {useNavigation} from "@react-navigation/core";
import {View} from "react-native";
import TopBar from "../components/TopBar";
import theme from "../custom-properties/Themes";

const ProfileScreen = (prop) => {
    const auth = getAuth();
    const navigation = useNavigation();
    let email;


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
            <Avatar.Text
                size={100}
                /*label={props.clientInfo.firstName[0]}*/
            />
            <Text>{/*{props.clientInfo.weight}*/}</Text>
            <Button onPress={() => handleSignOut()}>Sign Out</Button>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default ProfileScreen;
