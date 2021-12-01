// import * as React from 'react';
import React, {useState, useEffect} from "react";
import {Title} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {PieChart,} from 'react-native-chart-kit';
import theme from "../custom-properties/Themes";

let DEFAULT_SLEEP = 0;
let DEFAULT_MOOD = -1;
let DEFAULT_CARBS = 33;
let DEFAULT_FATS = 33;
let DEFAULT_PROTEINS = 33;
var globalDate;

const HWComponentView = (props) => {
    const [sleep, setSleep] = useState(DEFAULT_SLEEP);
    const [mood, setMood] = useState(DEFAULT_MOOD);
    const [carbs, setCarbs] = useState(DEFAULT_CARBS);
    const [fats, setFats] = useState(DEFAULT_FATS);
    const [proteins, setProteins] = useState(DEFAULT_PROTEINS);
    const [macroExists, setMacroExists] = useState(false);
    let textColor = 'black';
    let fontSize = 15;
    globalDate = props.date;

    useEffect(() => {
        loadSleepMoodMacros().then(() => {
            props.setLoaded(true)
        });
    }, [props.loaded])

    const loadSleepMoodMacros = async () => {
        // Search DB for Sleep
        console.log("Loading Sleep:");
        let sleepJS = JSON.stringify({email: props.email, date: (new Date(props.date)).toISOString().slice(0, 10)})
        console.log("Sleep JSON: ", sleepJS);
        await fetch("http://192.168.208.1:5000/api/search-client-sleep",
            {
                method: "POST",
                body: sleepJS,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log("SLEEP RESPONSE: ", responseJson);
                // Check if sleep exists, if not default to some value
                if (responseJson.results.length > 0){
                    setSleep(responseJson.results[0].rating);
                }
                else {
                    setSleep(DEFAULT_SLEEP);
                }
            })
            .catch(error => console.log("Sleep ERROR: ", error))

        // Search DB for Mood
        console.log("Loading Mood:");
        let moodJS = JSON.stringify({email: props.email, date: (new Date(props.date)).toISOString().slice(0, 10)})
        console.log("Mood JSON: ", moodJS);
        await fetch("http://192.168.208.1:5000/api/search-client-mood",
            {
                method: "POST",
                body: moodJS,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log("MOOD RESPONSE: ", responseJson);
                // Check if mood exists, if not default to some value
                setMood(DEFAULT_MOOD);
                if (responseJson.results.length > 0){
                    setMood(responseJson.results[0].rating);
                }
                else {
                    setMood(DEFAULT_MOOD);
                }
            })
            .catch(error => console.log("Mood ERROR: ", error))

        // Search DB for Macros
        console.log("Loading Macros:");
        let macroJS = JSON.stringify({email: props.email, date: (new Date(props.date)).toISOString().slice(0, 10)})
        console.log("Macro JSON: ", macroJS);
        await fetch("http://192.168.208.1:5000/api/search-client-macro",
            {
                method: "POST",
                body: moodJS,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log("MACRO RESPONSE: ", responseJson);
                // Check if macro exists, if not default to some value
                if (responseJson.results.length > 0){
                    setMacroExists(true);
                    let macroTemp = responseJson.results[0];
                    setCarbs(parseInt(macroTemp.carbs));
                    setFats(parseInt(macroTemp.fats));
                    setProteins(parseInt(macroTemp.proteins));
                }
                else {
                    setCarbs(DEFAULT_CARBS);
                    setFats(DEFAULT_FATS);
                    setProteins(DEFAULT_PROTEINS);
                    setMacroExists(false);
                }
            })
            .catch(error => console.log("Macro ERROR: ", error))
    }

    const updateSleep = (newValue) => {
        console.log("NEW SLEEP: ", newValue);
        console.log("CURRENT DATE: ", props.date);
        console.log("GLOBAL DATE: ", globalDate);
        submitSleep(newValue).then(() => {
            setSleep(newValue);
        })
    }

    const updateMood = (newValue) => {
        console.log("NEW MOOD: ", newValue);
        console.log("CURRENT DATE: ", props.date);
        submitMood(newValue).then(() => {
            setMood(newValue);
        })
    }

    const submitMood = async (mood) => {
        console.log("Submitting Mood:");
        let moodJS = JSON.stringify({email: props.email, rating: mood, date: (new Date(props.date)).toISOString().slice(0, 10)});
        console.log("Mood JSON: ", moodJS);
        fetch("http://192.168.208.1:5000/api/edit-client-mood",
            {
                method: "PATCH",
                body: moodJS,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log("Mood Response: ", responseJson);
            })
            .catch(error => console.log("Submit Mood ERROR: " + error))
    }

    const submitSleep = async (sleep) => {
        console.log("Submitting Sleep:");
        let sleepJS = JSON.stringify({email: props.email, rating: sleep, date: (new Date(globalDate)).toISOString().slice(0, 10)});
        console.log("Sleep JSON: ", sleepJS);
        fetch("http://192.168.208.1:5000/api/edit-client-sleep",
            {
                method: "PATCH",
                body: sleepJS,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log("Sleep Response: ", responseJson);
            })
            .catch(error => console.log("Submit Sleep ERROR: " + error))
    }

    return (
        <View>
            <Title>Sleep</Title>
            <Rating
                type='star'
                ratingCount={5}
                imageSize={60}
                startingValue={sleep}
                showRating
                onFinishRating={newValue => updateSleep(newValue)}
            />
            <Title>Mood</Title>
            <RadioButton.Group
                onValueChange={newValue => updateMood(newValue)}
                value={mood}
            >
                <View>
                    <Text style={{fontSize: 30}}>
                        <RadioButton
                            value={(mood === 0) ? mood : 0}
                        />
                        ☹️
                        <RadioButton
                            value={(mood === 1) ? mood : 1}
                        />
                        🙁
                        <RadioButton
                            value={(mood === 2) ? mood : 2}
                        />
                        😐
                        <RadioButton
                            value={(mood === 3) ? mood : 3}
                        />
                        🙂
                        <RadioButton
                            value={(mood === 4) ? mood : 4}
                        />
                        😀
                    </Text>
                </View>
            </RadioButton.Group>

            <Title>Macromolecule Ratio</Title>

            {macroExists ? <PieChart
                data={[
                    {
                        name: 'Carbs',
                        population: carbs,
                        color: theme.colors.lightBlue,
                        legendFontColor: textColor,
                        legendFontSize: fontSize
                    },
                    {
                        name: 'Fat',
                        population: fats,
                        color: theme.colors.purple,
                        legendFontColor: textColor,
                        legendFontSize: fontSize
                    },
                    {
                        name: 'Protein',
                        population: proteins,
                        color: theme.colors.orange,
                        legendFontColor: textColor,
                        legendFontSize: fontSize
                    },
                ]}
                width={350}
                height={220}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
            /> :
                <Text>No macros for today.</Text>
            }

        </View>
    );
}

export default HWComponentView;