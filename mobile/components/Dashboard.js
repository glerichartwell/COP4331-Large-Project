import React, {useEffect, useState} from "react";
import ProfileScreen from "../screens/ProfileScreen";
import DailyGoalsScreen from "../screens/DailyGoalsScreen";
import WorkoutsScreen from "../screens/WorkoutsScreen";
import HealthWellnessScreen from "../screens/HealthWellnessScreen";
import theme from '../custom-properties/Themes';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {getAuth} from "firebase/auth";
import {StyleSheet, View} from "react-native";

const Tab = createMaterialBottomTabNavigator();

const Dashboard = (props) => {
    const auth = getAuth();
    /*const [email, setEmail] = useState("");

    useEffect(() => {
        let user = auth.currentUser;
        /!*setEmail(user.email);*!/
        setEmail("iloveprincessbubblegum@gmail.com");
        /!*console.log("Setting email");*!/
    }, [email])*/

    return (
        <Tab.Navigator
            initialRouteName="Daily Goals"
            barStyle={styles.tab}
        >
            <Tab.Screen
                name="Profile"
                /*component={ProfileScreen}*/
                children={() => <ProfileScreen email={props.email} setEmail={props.setEmail}/>}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Daily Goals"
                /*component={DailyGoalsScreen}*/
                children={() => <DailyGoalsScreen email={props.email}/>}
                options={{
                    tabBarLabel: 'Daily Goals',
                    title: 'Daily Goals',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="calendar" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Workouts"
                /*component={WorkoutsScreen}*/
                children={() => <WorkoutsScreen email={props.email}/>}
                options={{
                    tabBarLabel: 'Workouts',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="dumbbell" color={color} size={26}/>
                    ),
                }}
            />
            {/*<Tab.Screen
                name="Health"
                children={() => <HealthWellnessScreen email={props.email}/>}
                options={{
                    tabBarLabel: 'H & W',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="heart" color={color} size={26}/>
                    ),
                }}
            />*/}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: theme.colors.purple,
        marginTop: 0,
    },
});

export default Dashboard;
