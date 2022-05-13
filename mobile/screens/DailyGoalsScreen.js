import React, {useEffect, useState} from "react";
import {Divider, List, Text, Title} from "react-native-paper";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import TopBar from "../components/TopBar";
import {ScrollView, StyleSheet, View} from "react-native";
import CustomLoading from "../components/CustomLoading";
import CustomDatePicker from "../components/CustomDatePicker";
import WorkoutCard from "../components/WorkoutCard";
import theme from "../custom-properties/Themes";
import HWComponent from "../components/HWComponent";

let DEFAULT_SLEEP = 0;
let DEFAULT_MOOD = -1;
let DEFAULT_CARBS = 33;
let DEFAULT_FATS = 33;
let DEFAULT_PROTEINS = 33;

const DailyGoalsScreen = (props) => {
    const auth = getAuth();
    const [loaded, setLoaded] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [workoutsExists, setWorkoutsExists] = useState(false);
    const [date, setDate] = useState((new Date()).toLocaleDateString());
    const [sleep, setSleep] = useState(DEFAULT_SLEEP);
    const [mood, setMood] = useState(DEFAULT_MOOD);
    const [carbs, setCarbs] = useState(DEFAULT_CARBS);
    const [fats, setFats] = useState(DEFAULT_FATS);
    const [proteins, setProteins] = useState(DEFAULT_PROTEINS);
    const [macroExists, setMacroExists] = useState(false);

    useEffect(() => {
        clearWorkouts();
        loadWorkoutInfo().then(() => {
            loadSleepMoodMacros().then(() => {
                setLoaded(true)
            });
        });
    }, [loaded])

    const loadWorkoutInfo = async () => {
        console.log("-----------");
        console.log("Loading workout info");
        clearWorkouts();
        let js = JSON.stringify({email: props.email, date: (new Date(date)).toISOString().slice(0, 10)})
        console.log("JSON: ", js);
        await fetch("https://courtneygenix.herokuapp.com/api/search-client-workout",
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
                    console.log(js);
                    await fetch("https://courtneygenix.herokuapp.com/api/get-workout",
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
            .catch(error => console.log("ERROR: " + error))
        console.log("-----------");
    }

    const loadSleepMoodMacros = async () => {
        // Search DB for Sleep
        let sleepJS = JSON.stringify({email: props.email, date: (new Date(date)).toISOString().slice(0, 10)})
        /*console.log("Loading Sleep:");
        console.log("Sleep JSON: ", sleepJS);*/
        await fetch("https://courtneygenix.herokuapp.com/api/search-client-sleep",
            {
                method: "POST",
                body: sleepJS,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                /*console.log("SLEEP RESPONSE: ", responseJson);*/
                // Check if sleep exists, if not default to some value
                if (responseJson.results.length > 0) {
                    setSleep(responseJson.results[0].rating);
                } else {
                    setSleep(DEFAULT_SLEEP);
                }
            })
            .catch(error => console.log("Sleep ERROR: ", error))

        // Search DB for Mood
        let moodJS = JSON.stringify({email: props.email, date: (new Date(date)).toISOString().slice(0, 10)})
        /*console.log("Loading Mood:");
        console.log("Mood JSON: ", moodJS);*/
        await fetch("https://courtneygenix.herokuapp.com/api/search-client-mood",
            {
                method: "POST",
                body: moodJS,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                /*console.log("MOOD RESPONSE: ", responseJson);*/
                // Check if mood exists, if not default to some value
                setMood(DEFAULT_MOOD);
                if (responseJson.results.length > 0) {
                    setMood(responseJson.results[0].rating);
                } else {
                    setMood(DEFAULT_MOOD);
                }
            })
            .catch(error => console.log("Mood ERROR: ", error))

        // Search DB for Macros
        let macroJS = JSON.stringify({email: props.email, date: (new Date(date)).toISOString().slice(0, 10)})
        /*console.log("Loading Macros:");
        console.log("Macro JSON: ", macroJS);*/
        await fetch("https://courtneygenix.herokuapp.com/api/search-client-macro",
            {
                method: "POST",
                body: moodJS,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                /*console.log("MACRO RESPONSE: ", responseJson);*/
                // Check if macro exists, if not default to some value
                if (responseJson.results.length > 0) {
                    setMacroExists(true);
                    let macroTemp = responseJson.results[0];
                    setCarbs(parseInt(macroTemp.carbs));
                    setFats(parseInt(macroTemp.fats));
                    setProteins(parseInt(macroTemp.proteins));
                } else {
                    setCarbs(DEFAULT_CARBS);
                    setFats(DEFAULT_FATS);
                    setProteins(DEFAULT_PROTEINS);
                    setMacroExists(false);
                }
            })
            .catch(error => console.log("Macro ERROR: ", error))
    }

    const clearWorkouts = () => {
        setWorkouts([])
        for (let i = 0; i < workouts.length; i++) {
            workouts.pop()
        }
    }

    if (loaded) {
        return (
            <View>
                <View
                    style={{backgroundColor: "white"}}
                >
                    <TopBar title="Daily Goals"/>
                    <Title
                        style={styles.title}
                    >Choose Day</Title>
                    <View
                        style={styles.datePickerView}
                    >
                        <CustomDatePicker date={date} setDate={setDate} setLoaded={setLoaded}/>
                    </View>
                    <Divider
                        style={styles.divider}
                    />
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Title
                        style={styles.title}
                    >Health & Wellness</Title>
                    <HWComponent
                        sleep={sleep}
                        setSleep={setSleep}
                        mood={mood}
                        setMood={setMood}
                        carbs={carbs}
                        setCarbs={setCarbs}
                        fats={fats}
                        setFats={setFats}
                        proteins={proteins}
                        setProteins={setProteins}
                        macroExists={macroExists}
                        setMacroExists={setMacroExists}
                        email={props.email}
                        date={date}
                    />
                    <Divider
                        style={styles.divider}
                    />
                    <Title
                        style={styles.title}
                    >Workouts</Title>
                    {workouts.map((workout) => (
                        <WorkoutCard
                            key={workout._id + workout.date}

                            name={workout.name}
                            date={workout.date}
                            timeToComplete={workout.timeToComplete}
                            comment={workout.comment}
                            exercises={workout.exercises}
                        />
                    ))}
                    {!workoutsExists &&
                    <Text
                        style={styles.noWorkoutsText}
                    >No workouts for this day.</Text>
                    }
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
        paddingBottom: 300,
        backgroundColor: "white",
    },
    divider: {
        backgroundColor: theme.colors.purple,
        height: 3,
        width: "100%",
        alignSelf: "center",
        marginTop: 10,
    },
    title: {
        textAlign: "center",
        marginBottom: 0,
        marginTop: 20,
    },
    datePickerView: {
        marginHorizontal: 40,
        backgroundColor: "white",
    },
    noWorkoutsText: {
        fontSize: 20,
        textAlign: "center",
    },
});

export default DailyGoalsScreen;
