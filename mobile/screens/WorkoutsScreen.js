import React, {useEffect, useState} from "react";
import {Divider, Surface, Text, Title} from "react-native-paper";
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
    const [workoutsExists, setWorkoutsExists] = useState(false);
    const [startDate, setStartDate] = useState((new Date()).toLocaleDateString());
    const [endDate, setEndDate] = useState((new Date()).toLocaleDateString());
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        clearWorkouts();
        loadWorkoutInfoDateRange().then(() => setLoaded(true));
    }, [loaded])

    const clearWorkouts = () => {
        setWorkouts([])
        for (let i = 0; i < workouts.length; i++) {
            workouts.pop()
        }
    }

    const loadAllWorkoutInfo = async () => {
        /*console.log("-----------");
        console.log("Loading workout info");*/
        await fetch("https://courtneygenix.herokuapp.com/api/view-all-workouts",
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
        clearWorkouts();
        let js = JSON.stringify({
            email: props.email,
            startDate: (new Date(startDate)).toISOString().slice(0, 10),
            endDate: (new Date(endDate)).toISOString().slice(0, 10),
        });
        console.log("WORKOUT JSON", js);
        await fetch("https://courtneygenix.herokuapp.com/api/view-client-workouts-by-date-range",
            {
                method: "POST",
                body: js,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then(async (responseJson) => {
                console.log("RESPONSE: ", responseJson);
                let workoutIDArray = responseJson.results;
                if (workoutIDArray.length === 0) {
                    setWorkoutsExists(false);
                } else {
                    setWorkoutsExists(true);
                }
                for (let i = 0; i < workoutIDArray.length; i++) {
                    let js = JSON.stringify({workoutID: workoutIDArray[i].workoutID})
                    console.log("Workout individual JSON: ", js);
                    await fetch("https://courtneygenix.herokuapp.com/api/get-workout",
                        {
                            method: "POST",
                            body: js,
                            headers: {"Content-Type": "application/json"},
                        })
                        .then(response => response.json())
                        .then((responseJson) => {
                            console.log("INDIVIDUAL RESPONSE: ", responseJson);
                            let newWorkouts = workouts;
                            let newWorkoutToAdd = responseJson.results[0];
                            newWorkoutToAdd.date = workoutIDArray[i].date;
                            let add = true;
                            for (let i = 0; i < workouts.length; i++) {
                                if (workouts[i].workoutID === newWorkoutToAdd.workoutID && workouts[i].date === newWorkoutToAdd.date) {
                                    add = false;
                                }
                            }
                            if (add) {
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
        await fetch("https://courtneygenix.herokuapp.com/api/view-client-workouts-by-week",
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
                    await fetch("https://courtneygenix.herokuapp.com/api/get-workout",
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
                <View>
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
                    <Divider
                        style={styles.divider}
                    />
                </View>
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
                        keyExtractor={(item) => (item._id + item.date)}
                        contentContainerStyle={styles.scrollContainer}
                    >
                    </FlatList>
                    {!workoutsExists &&
                    <Title
                        style={{textAlign: "center"}}
                    >
                        No workouts for this date range.
                    </Title>
                    }
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
        paddingBottom: 300,
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
    divider: {
        backgroundColor: theme.colors.purple,
        height: 3,
        width: "100%",
        alignSelf: "center",
        marginTop: 5,
    },
});

export default WorkoutsScreen;
