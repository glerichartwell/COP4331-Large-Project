import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import TopBar from "../components/TopBar";
// import { Title } from 'react-native-paper';
// import { Rating } from 'react-native-ratings';
// import { PieChart, } from 'react-native-chart-kit';

import HWComponentView from '../components/HWComponent';




const HealthWellnessScreen = () => {
    const testDate = "2021-11-17T00:00:00.000Z"
    const [sleep, setSleep] = useState(3);
    const [mood, setMood] = useState(3);

    return (
        <View>
            <TopBar title="Health-&nd-Well-ness"/>
            <HWComponentView/>
            {/* <HWComponentView setMood={setMood} mood={mood}/> */}
            
        </View>
    );
};

export default HealthWellnessScreen;
