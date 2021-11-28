import React, {useEffect, useState} from "react";
import ProfileScreen from "../screens/ProfileScreen";
import CalendarScreen from "../screens/CalendarScreen";
import WorkoutsScreen from "../screens/WorkoutsScreen";
import HealthWellnessScreen from "../screens/HealthWellnessScreen";
import theme from '../custom-properties/Themes';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const Tab = createMaterialBottomTabNavigator();

const Dashboard = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");

    /*onAuthStateChanged(auth, (user) => {
        if (user != null) {
            /!*setEmail(user["email"]);*!/
            setEmail("glerichartwell@gmail.com");
            console.log("Dashboard Email: " + email);
        } else {
            setEmail("");
            console.log("No more dashboard email");
        }
    });*/

    /*let user = auth.currentUser;
    /!*setEmail(user.email);*!/
    setEmail("glerichartwell@gmail.com");*/

    useEffect(() => {
        let user = auth.currentUser;
        /*setEmail(user.email);*/
        setEmail("glerichartwell@gmail.com");
        /*console.log("Setting email");*/
    }, [email])

    return (
        <Tab.Navigator
            initialRouteName="Calendar"
            barStyle={{backgroundColor: theme.colors.purple}}
        >
            <Tab.Screen
                name="Profile"
                /*component={ProfileScreen}*/
                children={() => <ProfileScreen email={email}/>}
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
                    tabBarLabel: 'H & W',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="heart" color={color} size={26}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Dashboard;
