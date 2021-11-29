import React, {useEffect, useState} from "react";
import {Text} from "react-native-paper";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {StyleSheet, View} from "react-native";
import TopBar from "../components/TopBar";

const WorkoutsScreen = (props) => {
    const auth = getAuth();
    const [workoutInfo, setWorkoutInfo] = useState(null);
    const [date, setDate] = useState(new Date());
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadWorkoutInfo();
    }, [loaded])

    const loadWorkoutInfo = () => {
        console.log("-----------");
        console.log("Loading workout info");
        let js = JSON.stringify({email: props.email, startDate: date.toISOString()});
        fetch("http://192.168.208.1:5000/api/view-client-workouts-by-week",
            {
                method: "POST",
                body: js,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                setLoaded(true);
            })
            .catch(error => console.log("ERROR: " + error))
        console.log("-----------");
    }

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
