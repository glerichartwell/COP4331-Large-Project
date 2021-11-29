import React, {useState} from "react";
import {Text} from "react-native-paper";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {View, StyleSheet} from "react-native";
import TopBar from "../components/TopBar";

import CustomMoodRating from "../components/CustomMoodRating";
import { Title } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'



const HealthWellnessScreen = () => {
    const auth = getAuth();
    let email;
    const [sleep, setSleep] = useState(3)
    const [mood, setMood] = useState(3)

    // onAuthStateChanged(auth, (user) => {
    //     if (user != null){
    //         email = user.email;
    //     }
    //     else {
    //         email = "";
    //     }
    // });

    const setRating = (rating) => {
        setSleep(rating)
    }

    const carbs = 50;
    const fats = 30;
    const protiens = 20;

    const textColor = 'black';
    const fontSize = 15;

    return (
        <View>
            <TopBar title="Health-&-Wellness"/>
            {/* Sleep rating */}
            <Title >Sleep</Title>
            <Rating
                type='star'
                ratingCount={5}
                imageSize={60}
                showRating
                onFinishRating={setRating}
            />
            {console.log("sleep: " + sleep)}

            {/* Mood rating */}
            <Title>Mood</Title>
            <CustomMoodRating setMood={setMood} mood={mood}/>
            {console.log("mood: " + mood)}
            {console.log("==================")}

            {/* pie chart */}
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
};

const styles = StyleSheet.create({
    SleepTitle: {
        height: '100%',
        // justifyContent: 'flex-end',
        // marginBottom: 20
    },
}
);

export default HealthWellnessScreen;
