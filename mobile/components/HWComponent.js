// import * as React from 'react';
import React, {useState, useEffect} from "react";
import {Title} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {PieChart,} from 'react-native-chart-kit';
import theme from "../custom-properties/Themes";

var globalDate;

const HWComponentView = (props) => {
    let textColor = 'black';
    let fontSize = 15;
    globalDate = props.date;

    const updateSleep = (newValue) => {
        /*console.log("NEW SLEEP: ", newValue);
        console.log("CURRENT DATE: ", props.date);
        console.log("GLOBAL DATE: ", globalDate);*/
        submitSleep(newValue).then(() => {
            props.setSleep(newValue);
        })
    }

    const updateMood = (newValue) => {
        /*console.log("NEW MOOD: ", newValue);
        console.log("CURRENT DATE: ", props.date);*/
        submitMood(newValue).then(() => {
            props.setMood(newValue);
        })
    }

    const submitMood = async (mood) => {
        let moodJS = JSON.stringify({email: props.email, rating: mood, date: (new Date(props.date)).toISOString().slice(0, 10)});
        /*console.log("Submitting Mood:");
        console.log("Mood JSON: ", moodJS);*/
        fetch("http://192.168.208.1:5000/api/edit-client-mood",
            {
                method: "PATCH",
                body: moodJS,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                /*console.log("Mood Response: ", responseJson);*/
            })
            .catch(error => console.log("Submit Mood ERROR: " + error))
    }

    const submitSleep = async (sleep) => {
        let sleepJS = JSON.stringify({email: props.email, rating: sleep, date: (new Date(globalDate)).toISOString().slice(0, 10)});
        /*console.log("Submitting Sleep:");
        console.log("Sleep JSON: ", sleepJS);*/
        fetch("http://192.168.208.1:5000/api/edit-client-sleep",
            {
                method: "PATCH",
                body: sleepJS,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                /*console.log("Sleep Response: ", responseJson);*/
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
                startingValue={props.sleep}
                showRating
                onFinishRating={newValue => updateSleep(newValue)}
            />
            <Title>Mood</Title>
            <RadioButton.Group
                onValueChange={newValue => updateMood(newValue)}
                value={props.mood}
            >
                <View>
                    <Text style={{fontSize: 30}}>
                        <RadioButton
                            value={(props.mood === 0) ? props.mood : 0}
                        />
                        ☹️
                        <RadioButton
                            value={(props.mood === 1) ? props.mood : 1}
                        />
                        🙁
                        <RadioButton
                            value={(props.mood === 2) ? props.mood : 2}
                        />
                        😐
                        <RadioButton
                            value={(props.mood === 3) ? props.mood : 3}
                        />
                        🙂
                        <RadioButton
                            value={(props.mood === 4) ? props.mood : 4}
                        />
                        😀
                    </Text>
                </View>
            </RadioButton.Group>

            <Title>Macromolecule Ratio</Title>

            {props.macroExists ? <PieChart
                data={[
                    {
                        name: 'Carbs',
                        population: props.carbs,
                        color: theme.colors.lightBlue,
                        legendFontColor: textColor,
                        legendFontSize: fontSize
                    },
                    {
                        name: 'Fat',
                        population: props.fats,
                        color: theme.colors.purple,
                        legendFontColor: textColor,
                        legendFontSize: fontSize
                    },
                    {
                        name: 'Protein',
                        population: props.proteins,
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