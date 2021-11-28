import React, {useState} from "react";
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
    const [clientInfo, setClientInfo] = useState(null);
    let email;

    onAuthStateChanged(auth, (user) => {
        if (user != null) {
            /*email = user["email"];*/
            console.log("THIS IS GOOD")
            email = "glerichartwell@gmail.com";
        } else {
            console.log("THIS IS BAD")
            email = "";
        }
    });

    const getClientInfo = () => {
        console.log("EMAIL:" + email);
        let js = JSON.stringify({search: email});
        fetch("http://192.168.208.1:5000/api/search-client",
            {
                method: "POST",
                body: js,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setClientInfo(responseJson.results[0]);
                console.log(clientInfo);
            })
            .catch(error => console.log("ERROR: " + error))
    }

    return (
        <Tab.Navigator
            initialRouteName="Calendar"
            barStyle={{backgroundColor: theme.colors.purple}}
        >
            {getClientInfo()}
            <Tab.Screen
                name="Profile"
                /*component={ProfileScreen}*/
                children={() => <ProfileScreen clientInfo={clientInfo}/>}
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
