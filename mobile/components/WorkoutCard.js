import React, {useEffect, useState} from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Card, Text, Paragraph, Button, List, Portal, Dialog} from "react-native-paper";
import theme from "../custom-properties/Themes";


const WorkoutCard = (props) => {
    const [exerciseName, setExerciseName] = useState(null);
    const [exerciseSets, setExerciseSets] = useState(null);
    const [exerciseReps, setExerciseReps] = useState(null);
    const [exerciseTime, setExerciseTime] = useState(null);
    const [exerciseWeight, setExerciseWeight] = useState(null);
    const [exerciseRest, setExerciseRest] = useState(null);
    const [showExercise, setShowExercise] = useState(false);

    const loadExercise = async (exerciseID) => {
        let js = JSON.stringify({exerciseID: exerciseID});
        /*console.log("-----------");
        console.log("Loading exercise ", exerciseID);
        console.log("JSON", js);*/
        await fetch("https://courtneygenix.herokuapp.com/api/get-exercise",
            {
                method: "POST",
                body: js,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                /*console.log("RESPONSE: ", responseJson);
                setExercise(responseJson.results[0]);*/
                let exerciseData = responseJson.results[0];
                setExerciseName(exerciseData.name);
                setExerciseSets(exerciseData.sets);
                setExerciseReps(exerciseData.reps);
                setExerciseTime(exerciseData.time);
                setExerciseWeight(exerciseData.weight);
                setExerciseRest(exerciseData.rest);
                /*console.log("Done loading exercise");*/
                displayExerciseModal();
                /*console.log("-----------");*/
            })
            .catch(error => console.log("ERROR: " + error))
    }

    const displayExerciseModal = () => {
        setShowExercise(true);
    }

    const hideExerciseModal = () => {
        setExerciseName(null);
        setExerciseSets(null);
        setExerciseReps(null);
        setExerciseTime(null);
        setExerciseWeight(null);
        setExerciseRest(null);
        setShowExercise(false);
    }

    const formatDate = (date) => {
        const d = new Date(date);
        const d2 = new Date( d.getTime() - d.getTimezoneOffset() * -60000);
        const year = d2.getFullYear();
        const month = d2.getMonth() + 1;
        const day = d2.getDate();
        return month + "/" + day + "/" + year;
    }

    return (
        <View>
            <Portal>
                <Dialog
                    visible={showExercise}
                    onDismiss={hideExerciseModal}
                >
                    <Dialog.Title>{exerciseName}</Dialog.Title>
                    <Dialog.Content>
                        <Text
                            style={styles.exerciseText}
                        >Sets: {exerciseSets}</Text>
                        <Text
                            style={styles.exerciseText}
                        >Reps: {exerciseReps}</Text>
                        <Text
                            style={styles.exerciseText}
                        >Estimated Time: {exerciseTime} second(s)</Text>
                        <Text
                            style={styles.exerciseText}
                        >Weight: {exerciseWeight} lb(s)</Text>
                        <Text
                            style={styles.exerciseText}
                        >Resting Period: {exerciseRest} second(s)</Text>
                    </Dialog.Content>
                    {/*<Dialog.Actions
                        style={styles.exerciseHideButtonArea}
                    >
                        <Button
                            onPress={hideExerciseModal}
                            style={styles.exerciseHideButton}
                        >Hide</Button>
                    </Dialog.Actions>*/}
                </Dialog>
            </Portal>
            <Card
                style={styles.card}
            >
                <Card.Title
                    title={props.name}
                    subtitle={"Date: " + formatDate(props.date)}
                />
                <Card.Content>
                    <Text>
                        Estimated Time to Complete: {props.timeToComplete} minute(s)
                    </Text>
                    <Text>
                        Comment: {props.comment}
                    </Text>
                </Card.Content>
                <Card.Content>
                        <List.Accordion
                            title="Exercises"
                            style={{backgroundColor: theme.colors.lightPurple}}
                        >
                            {props.exercises.map((exercise) => (
                                <List.Item
                                    title={exercise.name}
                                    key={exercise.id}
                                    onPress={() => loadExercise(exercise.id)}
                                />
                            ))}
                        </List.Accordion>
                </Card.Content>
            </Card>
        </View>
    );
};

export default WorkoutCard;

const styles = StyleSheet.create({
    card: {
        margin: 10,
        backgroundColor: theme.colors.lightPurple
    },
    exerciseText: {
        fontSize: 16
    },
    exerciseHideButtonArea: {
        alignSelf: "center",
    },
    exerciseHideButton: {
        width: "100%",
    },
});