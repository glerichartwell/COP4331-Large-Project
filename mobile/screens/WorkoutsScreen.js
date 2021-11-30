import React, {useEffect, useState} from "react";
import {Surface, Text, Title} from "react-native-paper";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {FlatList, ScrollView, StyleSheet, View} from "react-native";
import TopBar from "../components/TopBar";
import WorkoutCard from "../components/WorkoutCard";
import CustomLoading from "../components/CustomLoading";
import CustomDatePicker from "../components/CustomDatePicker";
import theme from "../custom-properties/Themes";

const WorkoutsScreen = (props) => {
    const auth = getAuth();
    const [workouts, setWorkouts] = useState([]);
    const [startDate, setStartDate] = useState((new Date()).toLocaleDateString());
    const [endDate, setEndDate] = useState((new Date()).toLocaleDateString());
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadWorkoutInfoDateRange().then(() => setLoaded(true));
    }, [loaded])

    const loadAllWorkoutInfo = async () => {
        /*console.log("-----------");
        console.log("Loading workout info");*/
        await fetch("http://192.168.208.1:5000/api/view-all-workouts",
            {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                /*console.log("RESPONSE: ", responseJson);*/
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                responseJson.results.sort(function (a, b) {
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
        /*console.log("-----------");*/
    }

    const loadWorkoutInfoDateRange = async () => {
        console.log("-----------");
        console.log("Loading workout info");
        let js = JSON.stringify({
            email: props.email,
            startDate: (new Date(startDate)).toISOString(),
            endDate: (new Date(endDate)).toISOString(),
        });
        console.log("JSON", js);
        await fetch("http://192.168.208.1:5000/api/view-client-workouts-by-date-range",
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
            .catch(error => console.log("ERROR: ", error))
        /*console.log("out");
        console.log("-----------");*/
    }

    const loadWorkoutWeekInfo = async () => {
        /*console.log("-----------");
        console.log("Loading workout info");*/
        let js = JSON.stringify({email: props.email, startDate: (new Date(startDate)).toISOString()});
        /*console.log("JSON", js);*/
        await fetch("http://192.168.208.1:5000/api/view-client-workouts-by-week",
            {
                method: "POST",
                body: js,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then(async (responseJson) => {
                /*console.log("RESPONSE: ", responseJson);*/
                let workoutIDArray = responseJson.results;
                for (let i = 0; i < workoutIDArray.length; i++) {
                    let js = JSON.stringify({workoutID: workoutIDArray[i].workoutID})
                    /*console.log(js);*/
                    await fetch("http://192.168.208.1:5000/api/get-workout",
                        {
                            method: "POST",
                            body: js,
                            headers: {"Content-Type": "application/json"},
                        })
                        .then(response => response.json())
                        .then((responseJson) => {
                            /*console.log(responseJson);*/
                            let newWorkouts = workouts;
                            let newWorkoutToAdd = responseJson.results[0];
                            newWorkouts.push(newWorkoutToAdd);
                            setWorkouts(newWorkouts);
                            /*console.log("WORKOUTS: ", workouts);*/
                        })
                        .catch(error => console.log("ERROR: ", error))
                }
            })
            .catch(error => console.log("ERROR: ", error))
        /*console.log("out");
        console.log("-----------");*/
    }

    if (loaded) {
        return (
            <View
                style={{backgroundColor: "white"}}
            >
                <TopBar title="Workouts"/>
                    <Title
                        style={styles.dateTitle}
                    >Choose Date Range</Title>
                    <Surface
                        style={styles.dateArea}
                    >
                        <Surface
                            style={styles.dateStart}
                        >
                            <Text
                                style={{textAlign: "center"}}
                            >Start Date:</Text>
                            <CustomDatePicker date={startDate} setDate={setStartDate} setLoaded={setLoaded}/>
                        </Surface>
                        <Surface
                            style={styles.dateEnd}
                        >
                            <Text
                                style={{textAlign: "center"}}
                            >End Date:</Text>
                            <CustomDatePicker date={endDate} setDate={setEndDate} setLoaded={setLoaded}/>
                        </Surface>
                    </Surface>
                <Surface
                    style={styles.workoutSurface}
                >
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
                </Surface>
            </View>
        );
    } else {
        return (
            <View>
                <TopBar title="Workouts"/>
                <CustomLoading/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 100,
    },
    dateArea: {
        width: "100%",
        position: "relative",
    },
    dateStart: {
        position: "absolute",
        left: "2%",
        width: "45%",
    },
    dateEnd: {
        left: "50%",
        width: "45%",
    },
    workoutSurface: {
        top: 20,
        marginBottom: 150,
    },
    dateTitle: {
        textAlign: "center",
        marginBottom: 20,
        marginTop: 20,
    },
});

export default WorkoutsScreen;
