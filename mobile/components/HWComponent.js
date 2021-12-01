// import * as React from 'react';
import React, {useState, useEffect} from "react";
import { Title } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { PieChart, } from 'react-native-chart-kit';
var globalDate;
// const [globalDate, setglobalDate] = useState()
const HWComponentView = (props) => {
    // {console.log("in HWComponentView+++++++++++++++++++++++++++++++++")}
    globalDate = props.date;
    // {console.log("GLOBAL date in HW: " + globalDate)}

    // updats the data base when the user clicks a new rating for mood
    const submitEditMood = async (updatedMood) => {
        // creates json object and calls 
        // let newDate = props.date
        // console.log(props.date);
        let js = JSON.stringify({email: props.email, rating: updatedMood, date: (new Date(props.date)).toISOString().slice(0, 10)});
        {console.log("mood  json: " + js)}
        fetch("http://10.0.0.29:5000/api/edit-client-mood",
        {
            method: "PATCH",
            body: js,
            headers: {"Content-Type": "application/json"},
        })
        .then(response => response.json())
        .then((responseJson) => {
            // console.log(responseJson);
        })
        .catch(error => console.log("Json ERROR: " + error))
    }

    // updats the data base when the user clicks a new rating for sleep
    const submitEditSleep = async (updatedSleep) => {
        // creates json object and calls 
        // {console.log("================: " + globalDate)}
        let js = JSON.stringify({email: props.email, rating: updatedSleep, date: (new Date(globalDate)).toISOString().slice(0, 10)});
        {console.log("sleep json: " + js)}
        fetch("http://10.0.0.29:5000/api/edit-client-sleep",
        {
            method: "PATCH",
            body: js,
            headers: {"Content-Type": "application/json"},
        })
        .then(response => response.json())
        .then((responseJson) => {
            // console.log(responseJson);
        })
        .catch(error => console.log("Json ERROR: " + error))
    }

    const setRating = (rating) => {
        // setSleep(rating)
        submitEditSleep(rating);
    }

    const [sleep, setSleep] = useState(0);
    const [mood, setMood] = useState(0);

    let jsonFats;
    let jsonCarbs;
    let jsonProtiens;
    let js = JSON.stringify({email: props.email, date: props.date});
    fetch("http://10.0.0.29:5000/api/search-client-macro",
    {
        method: "POST",
        body: js,
        headers: {"Content-Type": "application/json"},
    })
    .then(response => response.json())
    .then((responseJson) => {
        jsonFats = responseJson.results[0].fat;
        jsonCarbs = responseJson.results[0].carbs;
        jsonProtiens = responseJson.results[0].protiens;
    })
    .catch(error => console.log("Macro ERROR: " + error))

    // set the variables to what came from the database, or place holders
    const carbs = (jsonCarbs) ? jsonCarbs : 23;
    const fats = (jsonFats) ? jsonFats : 37;
    const protiens = (jsonProtiens) ? jsonProtiens : 35;

    // hard coded color vars... TODO: fix
    const textColor = 'black';
    const fontSize = 15;
    
    useEffect(()=>{
        setMood(0);
        // setRating(0);
        // setStart(0);
        // start = 0;
        setSleep(0);
    }, [props.date])

    // const [start, setStart] = useState(0);
    // var start = 0;

    return (
    <View>
        <Title >Sleep</Title>
        <Rating
            type='star'
            ratingCount={5}
            imageSize={60}
            startingValue={props.startStar}
            showRating
            onFinishRating={setRating}
        />
        {/* start = 0; */}
        <Title>Mood</Title>
        <RadioButton.Group onValueChange={newValue => {setMood(newValue); submitEditMood(newValue)}} value={mood}>
        <View>
            <Text style={{fontSize:30}}>
                <RadioButton value="1"/>
                ☹️
                <RadioButton value="2"/>
                🙁
                <RadioButton value="3"/>
                😐
                <RadioButton value="4"/>
                🙂
                <RadioButton value="5"/>
                😀
            </Text>
        </View>
        </RadioButton.Group>

        <Title>Macromolecule Ratio</Title>
        <PieChart
            data={[
                { name: 'Carbs',   population: carbs, color: '#28B7CB',    legendFontColor: textColor, legendFontSize: fontSize },
                { name: 'Fat',     population: fats, color: '#64104D',     legendFontColor: textColor, legendFontSize: fontSize },
                { name: 'Protien', population: protiens, color: '#ED5E4F', legendFontColor: textColor, legendFontSize: fontSize },
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
        />
    </View>
    );
}

export default HWComponentView;