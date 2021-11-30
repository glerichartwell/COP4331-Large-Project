// import * as React from 'react';
import React, {useState} from "react";
import { Title } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { PieChart, } from 'react-native-chart-kit';

const HWComponentView = (props) => {

    const setRating = (rating) => {
        setSleep(rating)
    }

    const [sleep, setSleep] = useState(3);
    const [mood, setMood] = useState(3);

    const carbs = 50;
    const fats = 30;
    const protiens = 20;

    const textColor = 'black';
    const fontSize = 15;

    return (
    <View>
        <Title >Sleep</Title>
        <Rating
            type='star'
            ratingCount={5}
            imageSize={60}
            showRating
            onFinishRating={setRating}
        />
        {console.log("sleep: " + sleep)}

        <Title>Mood</Title>
        <RadioButton.Group onValueChange={newValue => setMood(newValue)} value={mood}>
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

        {console.log("mood: " + mood)}
        {console.log("==================")}

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