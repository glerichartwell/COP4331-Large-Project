import React, {useState} from "react";
import {Text} from "react-native-paper";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import TopBar from "../components/TopBar";
import {StyleSheet, View} from "react-native";
import CustomLoading from "../components/CustomLoading";
import CustomDatePicker from "../components/CustomDatePicker";

const DailyGoalsScreen = (props) => {
    const auth = getAuth();
    const [loaded, setLoaded] = useState(true);
    const [date, setDate] = useState((new Date()).toLocaleDateString());

    if (loaded) {
        return (
            <View>
                <TopBar title="Daily Goals"/>
                <Text>Schedule</Text>
                <CustomDatePicker date={date} setDate={setDate}/>
            </View>
        );
    } else {
        return (
            <View>
                <TopBar title="Daily Goals"/>
                <CustomLoading/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default DailyGoalsScreen;
