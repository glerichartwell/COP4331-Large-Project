import React, {useEffect, useState} from "react";
import {Text} from "react-native-paper";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {FlatList, ScrollView, StyleSheet, View} from "react-native";
import TopBar from "../components/TopBar";
import WorkoutCard from "../components/WorkoutCard";

const WorkoutsScreen = (props) => {
    const auth = getAuth();
    const [workouts, setWorkouts] = useState(null);
    const [date, setDate] = useState(new Date());
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadWorkoutInfo().then(() => setLoaded(true));
    }, [loaded])

    const loadWorkoutInfo = async () => {
        console.log("-----------");
        console.log("Loading workout info");
        let js = JSON.stringify({email: props.email, startDate: date.toISOString()});
        console.log("JSON", js);
        await fetch("http://192.168.208.1:5000/api/view-all-workouts",
            {
                method: "GET",
                /*body: js,*/
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                /*console.log("RESPONSE: ", responseJson);*/
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                responseJson.results.sort(function(a, b) {
                    let nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    let nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });
                setWorkouts(responseJson.results);
            })
            .catch(error => console.log("ERROR: " + error))
        console.log("-----------");
    }

    return (loaded && (
        <View>
            <TopBar title="Workouts"/>
            <FlatList
                renderItem={({item, index, separators}) =>
                    <WorkoutCard
                        name={item.name}
                        date={item.date}
                        timeToComplete={item.timeToComplete}
                        comment={item.comment}
                        exercises={item.exercises}
                    />
                }
                data={workouts}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.scrollContainer}
            >
            </FlatList>
        </View>
    ));
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 100,
    },
});

export default WorkoutsScreen;
