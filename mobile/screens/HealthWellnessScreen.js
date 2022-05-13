import React, {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import TopBar from "../components/TopBar";
import { Title } from 'react-native-paper';
// import { Rating } from 'react-native-ratings';
// import { PieChart, } from 'react-native-chart-kit';

import HWComponentView from '../components/HWComponent';
import CustomDatePicker from "../components/CustomDatePicker";
import CustomLoading from "../components/CustomLoading";


const HealthWellnessScreen = (props) => {
    const [date, setDate] = useState((new Date()).toLocaleDateString());
    const [loaded, setLoaded] = useState(false);

    if (true) {
        return (
            <View>
                <TopBar title="Health & Wellness"/>

                <Title>Choose Day Component:</Title>
                <CustomDatePicker date={date} setDate={setDate} setLoaded={setLoaded}/>
                <Title>Health & Wellness Component:</Title>
                <HWComponentView date={date} email={props.email} loaded={loaded} setLoaded={setLoaded}/>
            </View>
        );
    }
    else {
        return (
            <View>
                <TopBar title="Health & Wellness"/>
                <CustomLoading/>
            </View>
        );
    }
};

export default HealthWellnessScreen;