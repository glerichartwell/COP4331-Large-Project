import React from "react";
import ProfileScreen from "../screens/ProfileScreen";
import CalendarScreen from "../screens/CalendarScreen";
import WorkoutsScreen from "../screens/WorkoutsScreen";
import HealthWellnessScreen from "../screens/HealthWellnessScreen";
import theme from '../custom-properties/Themes';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

const Dashboard = () => {
    return (
        <Tab.Navigator
            initialRouteName="Calendar"
            barStyle={{backgroundColor: theme.colors.purple}}
        >
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    tabBarLabel: 'Calendar',
                    title: 'Calendar',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="calendar" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Workouts"
                component={WorkoutsScreen}
                options={{
                    tabBarLabel: 'Workouts',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="dumbbell" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Health"
                component={HealthWellnessScreen}
                options={{
                    tabBarLabel: 'Health',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="heart" color={color} size={26}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Dashboard;
