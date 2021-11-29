import React, {useEffect, useState} from "react";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {Card, Text, Paragraph, Button, List, Portal, Dialog} from "react-native-paper";


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
        console.log("-----------");
        console.log("Loading exercise ", exerciseID);
        console.log("JSON", js);
        await fetch("http://192.168.208.1:5000/api/get-exercise",
            {
                method: "POST",
                body: js,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log("RESPONSE: ", responseJson);
                /*setExercise(responseJson.results[0]);*/
                let exerciseData = responseJson.results[0];
                setExerciseName(exerciseData.name);
                setExerciseSets(exerciseData.sets);
                setExerciseReps(exerciseData.reps);
                setExerciseTime(exerciseData.time);
                setExerciseWeight(exerciseData.weight);
                setExerciseRest(exerciseData.rest);
                console.log("Done loading exercise");
                displayExerciseModal();
                console.log("-----------");
            })
            .catch(error => console.log("ERROR: " + error))
    }

    const displayExerciseModal = () => {
        setShowExercise(true);
    }

    return (
        <React.Fragment>
            <Portal>
                <Dialog
                    visible={showExercise}
                    onDismiss={() => setShowExercise(false)}
                >
                    <Dialog.Title>{exerciseName}</Dialog.Title>
                    <Dialog.Content>
                        <Text>Sets: {exerciseSets}</Text>
                        <Text>Reps: {exerciseReps}</Text>
                        <Text>Estimated Time: {exerciseTime} seconds</Text>
                        <Text>Weight: {exerciseWeight} lb(s)</Text>
                        <Text>Resting Period: {exerciseRest} seconds</Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
            <Card>
                <Card.Title
                    title={props.name}
                    subtitle={"Date: " + props.date}
                />
                <Card.Content>
                    <Text>
                        Estimated Time to Complete: {props.timeToComplete} minutes
                    </Text>
                    <Text>
                        Comment: {props.comment}
                    </Text>
                </Card.Content>
                <Card.Content>
                        <List.Accordion
                            title="Exercises"
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
        </React.Fragment>
    );
};

export default WorkoutCard;

const styles = StyleSheet.create({});