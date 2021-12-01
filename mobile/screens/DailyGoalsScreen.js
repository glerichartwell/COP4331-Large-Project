import React, {useEffect, useState} from "react";
import {Divider, List, Text, Title} from "react-native-paper";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import TopBar from "../components/TopBar";
import {ScrollView, StyleSheet, View} from "react-native";
import CustomLoading from "../components/CustomLoading";
import CustomDatePicker from "../components/CustomDatePicker";
import WorkoutCard from "../components/WorkoutCard";
import theme from "../custom-properties/Themes";

const DailyGoalsScreen = (props) => {
    const auth = getAuth();
    const [loaded, setLoaded] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [date, setDate] = useState((new Date()).toLocaleDateString());

    useEffect(() => {
        loadWorkoutInfo().then(() => {
            setLoaded(true)
        });
    }, [loaded])

    const loadWorkoutInfo = async () => {
        console.log("-----------");
        console.log("Loading workout info");
        for (let i = 0; i < workouts.length; i++){
            workouts.pop();
        }
        let js = JSON.stringify({email: props.email, date: (new Date(date)).toISOString().slice(0, 10)})
        console.log("JSON: ", js);
        await fetch("http://192.168.208.1:5000/api/search-client-workout",
            {
                method: "POST",
                body: js,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then(async (responseJson) => {
                console.log("RESPONSE: ", responseJson);
                let workoutIDArray = responseJson.results;
                for (let i = 0; i < workoutIDArray.length; i++) {
                    let js = JSON.stringify({workoutID: workoutIDArray[i].workoutID})
                    console.log(js);
                    await fetch("http://192.168.208.1:5000/api/get-workout",
                        {
                            method: "POST",
                            body: js,
                            headers: {"Content-Type": "application/json"},
                        })
                        .then(response => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                            let newWorkouts = workouts;
                            let newWorkoutToAdd = responseJson.results[0];
                            newWorkoutToAdd.date = workoutIDArray[i].date;
                            let add = true;
                            for (let i = 0; i < workouts.length; i++){
                                if (workouts[i].workoutID === newWorkoutToAdd.workoutID && workouts[i].date === newWorkoutToAdd.date){
                                    add = false;
                                }
                            }
                            if (add){
                                newWorkouts.push(newWorkoutToAdd);
                            }
                            setWorkouts(newWorkouts);
                            console.log("WORKOUTS: ", workouts);
                        })
                        .catch(error => console.log("ERROR: ", error))
                }
            })
            .catch(error => console.log("ERROR: " + error))
        console.log("-----------");
    }

    if (loaded) {
        return (
            <View>
                <TopBar title="Daily Goals"/>
                <Title>Choose Day:</Title>
                <CustomDatePicker date={date} setDate={setDate} setLoaded={setLoaded}/>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Title>Health & Wellness</Title>
                    <Text>HEALTH & WELLNESS COMPONENT GOES HERE</Text>
                    <Divider
                        style={styles.divider}
                    />
                    <Title>Workouts</Title>
                    {workouts.map((workout) => (
                        <WorkoutCard
                            key={workout._id}

                            name={workout.name}
                            date={workout.date}
                            timeToComplete={workout.timeToComplete}
                            comment={workout.comment}
                            exercises={workout.exercises}
                        />
                    ))}
                </ScrollView>
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
    scrollContainer: {
        marginBottom: 100,
    },
    divider: {
        backgroundColor: theme.colors.purple,
        height: 3,
        width: "100%",
        alignSelf: "center"
    },
});

export default DailyGoalsScreen;
