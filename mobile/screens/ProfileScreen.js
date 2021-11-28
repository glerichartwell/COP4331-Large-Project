import React, {useEffect, useState} from "react";
import {Avatar, Button, Text, Title, Portal, Modal, TextInput} from "react-native-paper";
import {Platform, StyleSheet, View} from "react-native";
import {getAuth, signOut} from "firebase/auth";
import {useNavigation} from "@react-navigation/core";
import TopBar from "../components/TopBar";
import DateTimePicker from '@react-native-community/datetimepicker';

const ProfileScreen = (props) => {
    const auth = getAuth();
    const navigation = useNavigation();
    const [clientInfo, setClientInfo] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [editDob, setEditDob] = useState(new Date());
    const [editGender, setEditGender] = useState(null);
    let [editEmail, setEditEmail] = useState(null);
    const [editPhone, setEditPhone] = useState(null);
    const [editCity, setEditCity] = useState(null);
    const [editHeight, setEditHeight] = useState(null);
    const [editWeight, setEditWeight] = useState(null);

    useEffect(() => {
        loadClientInfo();
    }, [loaded])

    const loadClientInfo = () => {
        /*console.log("-----------");
        console.log("Loading client info");
        console.log("EMAIL:" + props.email);*/
        let js = JSON.stringify({search: props.email});
        fetch("http://192.168.208.1:5000/api/search-client",
            {
                method: "POST",
                body: js,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                setClientInfo(responseJson.results[0]);
                setLoaded(true);
                /*console.log("Client Info:");
                console.log(responseJson.results[0]);*/
            })
            .catch(error => console.log("ERROR: " + error))
        /*console.log("-----------");*/
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate("Login");
            })
            .catch(error => console.log(error.message))
    }

    const formatBirthday = (birthday, fromDatePicker) => {
        const date = new Date(birthday);
        return date.toLocaleDateString();
        console.log(date.toLocaleDateString())
        if (fromDatePicker){
            date.setDate(date.getDate() - 1);
        }
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate() + 1;
        /*return month + "/" + day + "/" + year;*/

    }

    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);

        let diff_ms = Date.now() - birthDate.getTime();
        let age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    const formatName = (firstName, middleName, lastName) => {
        if (middleName === "") {
            return firstName + " " + lastName;
        } else {
            return firstName + " " + middleName + " " + lastName;
        }
    }

    const showEditModal = () => {
        setShowEdit(true);
        setShowDatePicker(false);
        let newDob = new Date(clientInfo.birthday);
        /*newDob.setDate(newDob.getDate() + 1);*/
        setEditDob(newDob);
    }

    const hideEditModal = () => {
        setShowEdit(false);
        setShowDatePicker(false);

        setEditDob(new Date());
        setEditGender(null);
        setEditEmail(null);
        setEditPhone(null);
        setEditCity(null);
        setEditHeight(null);
        setEditWeight(null);
    }

    const dateChange = (event, selectedDate) => {
        const currentDate = selectedDate || editDob;
        setShowDatePicker(Platform.OS === "ios"); // IDK
        setEditDob(currentDate);
    }

    const submitEdit = () => {
        let newBirthday = null;
        /*editDob.setDate(editDob.getDate() - 1);*/
        let dobDBString = editDob.toISOString().split("T")[0];
        if (dobDBString !== clientInfo.birthday) {
            newBirthday = dobDBString;
        }
        if (editEmail === null) {
            editEmail = props.email;
        }
        let obj = {
            birthday: newBirthday,
            gender: editGender,
            email: editEmail,
            phone: editPhone,
            city: editCity,
            height: editHeight,
            weight: editWeight
        }
        let js = JSON.stringify(obj);
        console.log(js);

        fetch("http://192.168.208.1:5000/api/edit-client",
            {
                method: "PATCH",
                body: js,
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch(error => console.log("ERROR: " + error))
        hideEditModal();
        setLoaded(false);
        loadClientInfo();
    }

    return (loaded && (
        <View>
            <Portal>
                <Modal
                    visible={showEdit}
                    onDismiss={() => hideEditModal()}
                    contentContainerStyle={styles.editPopUp}
                >
                    {showDatePicker && (
                        <DateTimePicker
                            value={editDob}
                            mode="date"
                            display="default"
                            onChange={dateChange}
                        />)}
                    <Text>Date of Birth:</Text>
                    <TextInput
                        onFocus={() => setShowDatePicker(true)}
                        disabled={true}
                        placeholder={formatBirthday(editDob, true)}
                        right={<TextInput.Icon name="calendar" onPress={() => setShowDatePicker(true)}/>}
                    />
                    <Text>Gender:</Text>
                    <TextInput
                        mode="outlined"
                        label={clientInfo.gender}
                        onChangeText={text => setEditGender(text)}
                    />
                    <Text>Email:</Text>
                    <TextInput
                        label={clientInfo.email}
                        onChangeText={text => setEditEmail(text)}
                    />
                    <Text>Phone:</Text>
                    <TextInput
                        label={clientInfo.phone}
                        keyboardType="phone-pad"
                        onChangeText={text => setEditPhone(text)}
                    />
                    <Text>City:</Text>
                    <TextInput
                        label={clientInfo.city}
                        onChangeText={text => setEditCity(text)}
                    />
                    <Text>Height:</Text>
                    <TextInput
                        label={clientInfo.height}
                        keyboardType="numeric"
                        right={<TextInput.Affix text="inches"/>}
                        onChangeText={text => setEditHeight(text)}
                    />
                    <Text>Weight:</Text>
                    <TextInput
                        label={clientInfo.weight}
                        keyboardType="numeric"
                        right={<TextInput.Affix text="lbs"/>}
                        onChangeText={text => setEditWeight(text)}
                    />
                    <Button onPress={submitEdit}>Submit</Button>
                </Modal>
            </Portal>
            <TopBar title="Profile"/>
            <Avatar.Text
                size={100}
                label={clientInfo.firstName[0]}
                style={styles.avatar}
            />
            <Title
                style={styles.name}>{formatName(clientInfo.firstName, clientInfo.middleName, clientInfo.lastName)}</Title>
            <Text>Date of Birth: {formatBirthday(clientInfo.birthday, false)}</Text>
            <Text>Age: {calculateAge(clientInfo.birthday)}</Text>
            <Text>Gender: {clientInfo.gender}</Text>
            <Title>Contact</Title>
            <Text>Email: {clientInfo.email}</Text>
            <Text>Phone: {clientInfo.phone}</Text>
            <Text>City: {clientInfo.city}</Text>
            <Title>Measurements</Title>
            <Text>Height: {clientInfo.height} inches</Text>
            <Text>Weight: {clientInfo.weight} lbs</Text>
            <Button onPress={showEditModal}>Edit</Button>
            <Button onPress={handleSignOut}>Sign Out</Button>
        </View>
    ));
}

const styles = StyleSheet.create({
    avatar: {
        alignSelf: "center",
    },
    name: {
        alignSelf: "center",
    },
    editPopUp: {
        backgroundColor: "white",
        borderRadius: 20,
        margin: 30,
        padding: 20,
    }
});

export default ProfileScreen;
