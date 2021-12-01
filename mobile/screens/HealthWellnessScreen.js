import React, {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import TopBar from "../components/TopBar";
import { Title } from 'react-native-paper';
// import { Rating } from 'react-native-ratings';
// import { PieChart, } from 'react-native-chart-kit';

import HWComponentView from '../components/HWComponent';
import CustomDatePicker from "../components/CustomDatePicker";



const HealthWellnessScreen = (props) => {
    // const testDate = "2021-11-17"
    const [date, setDate] = useState((new Date()).toLocaleDateString());
    const [loaded, setLoaded] = useState(false);
    const [refresh , setRefresh ] = useState(false);
    let js = JSON.stringify({emairl: props.email, date: (new Date(date)).toISOString()})



    return (
        <View>
            <TopBar title="Health & Wellness"/>

            <Title>Choose Day Component:</Title>
            <CustomDatePicker date={date} setDate={setDate} setLoaded={setLoaded}/>
            {/* somehow reset the next component */}
            <Title>Health & Wellness Component:</Title>
            <HWComponentView date={date} email={props.email} startStar={0}/>
        </View>
    );
};

export default HealthWellnessScreen;