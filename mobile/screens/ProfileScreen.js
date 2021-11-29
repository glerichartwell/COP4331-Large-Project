import React, {useEffect, useState} from "react";
import {Avatar, Button, Text, Title, Portal, Modal, TextInput, Divider} from "react-native-paper";
import {Platform, StyleSheet, View} from "react-native";
import {getAuth, signOut} from "firebase/auth";
import {useNavigation} from "@react-navigation/core";
import TopBar from "../components/TopBar";
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInputMask} from 'react-native-masked-text'
import {DatePicker} from 'react-native-woodpicker'
import theme from "../custom-properties/Themes";

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
        if (!fromDatePicker) {
            date.setDate(date.getDate() + 1);
        }
        return date.toLocaleDateString();
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
        newDob.setDate(newDob.getDate() + 1);
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

    function formatPhoneNumber(value) {
        // if input value is falsy eg if the user deletes the input, then just return
        if (!value) return value;

        // clean the input for any non-digit values.
        const phoneNumber = value.replace(/[^\d]/g, "");

        // phoneNumberLength is used to know when to apply our formatting for the phone number
        const phoneNumberLength = phoneNumber.length;

        // we need to return the value with no formatting if its less then four digits
        // this is to avoid weird behavior that occurs if you  format the area code to early

        if (phoneNumberLength < 4) return phoneNumber;

        // if phoneNumberLength is greater than 4 and less the 7 we start to return
        // the formatted number
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }

        // finally, if the phoneNumberLength is greater then seven, we add the last
        // bit of formatting and return it.
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 10)}`;
    }

    const handlePhoneChange = (e) => {
        // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
        const formattedPhoneNumber = formatPhoneNumber(e);
        // we'll set the input value using our setInputValue
        setEditPhone(formattedPhoneNumber);
        // From https://tomduffytech.com/how-to-format-phone-number-in-react/
    }

    const submitEdit = () => {
        let newBirthday = null;
        editDob.setDate(editDob.getDate() - 1);
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
                    <Text style={styles.editText}>Date of Birth:</Text>
                    <TextInput
                        onFocus={() => setShowDatePicker(true)}
                        disabled={true}
                        placeholder={formatBirthday(editDob, true)}
                        right={<TextInput.Icon name="calendar" onPress={() => setShowDatePicker(true)}/>}

                        mode="outlined"
                        style={styles.editTextInput}
                    />
                    <Text style={styles.editText}>Gender:</Text>
                    <TextInput
                        label={clientInfo.gender}
                        onChangeText={text => setEditGender(text)}

                        mode="outlined"
                        style={styles.editTextInput}
                    />
                    <Text style={styles.editText}>Email:</Text>
                    <TextInput
                        label={clientInfo.email}
                        onChangeText={text => setEditEmail(text)}

                        mode="outlined"
                        style={styles.editTextInput}
                    />
                    <Text style={styles.editText}>Phone:</Text>
                    <TextInput
                        label={clientInfo.phone}
                        keyboardType="phone-pad"
                        onChangeText={text => handlePhoneChange(text)}
                        value={editPhone}

                        mode="outlined"
                        style={styles.editTextInput}
                    />
                    <Text style={styles.editText}>City:</Text>
                    <TextInput
                        label={clientInfo.city}
                        onChangeText={text => setEditCity(text)}

                        mode="outlined"
                        style={styles.editTextInput}
                    />
                    <Text style={styles.editText}>Height:</Text>
                    <TextInput
                        label={clientInfo.height}
                        keyboardType="numeric"
                        right={<TextInput.Affix text="inches"/>}
                        onChangeText={text => setEditHeight(text)}

                        mode="outlined"
                        style={styles.editTextInput}
                    />
                    <Text style={styles.editText}>Weight:</Text>
                    <TextInput
                        label={clientInfo.weight}
                        keyboardType="numeric"
                        right={<TextInput.Affix text="lbs"/>}
                        onChangeText={text => setEditWeight(text)}

                        mode="outlined"
                        style={styles.editTextInput}
                    />
                    <Button
                        onPress={submitEdit}
                        mode="contained"
                        style={styles.editSubmitButton}
                    >Submit</Button>
                </Modal>
            </Portal>
            <TopBar title="Profile"/>
            <Avatar.Text
                size={100}
                label={clientInfo.firstName[0]}
                style={styles.avatar}
            />
            <Title
                style={styles.name}
            >{formatName(clientInfo.firstName, clientInfo.middleName, clientInfo.lastName)}</Title>
            <Divider
                style={styles.divider}
            />
            <Text
                style={styles.text}
            >Date of Birth: {formatBirthday(clientInfo.birthday, false)}</Text>
            <Text
                style={styles.text}
            >Age: {calculateAge(clientInfo.birthday)}</Text>
            <Text
                style={styles.text}
            >Gender: {clientInfo.gender}</Text>
            <Title
                style={styles.title}
            >Contact</Title>
            <Divider
                style={styles.divider}
            />
            <Text
                style={styles.text}
            >Email: {clientInfo.email}</Text>
            <Text
                style={styles.text}
            >Phone: {clientInfo.phone}</Text>
            <Text
                style={styles.text}
            >City: {clientInfo.city}</Text>
            <Title
                style={styles.title}
            >Measurements</Title>
            <Divider
                style={styles.divider}
            />
            <Text
                style={styles.text}
            >Height: {clientInfo.height} inches</Text>
            <Text
                style={styles.text}
            >Weight: {clientInfo.weight} lbs</Text>
            <Button
                onPress={showEditModal}
                style={styles.editButton}
                mode="contained"
            >Edit</Button>
            <Button
                onPress={handleSignOut}
                style={styles.signOutButton}
                mode="contained"
            >Sign Out</Button>
        </View>
    ));
}

const styles = StyleSheet.create({
    avatar: {
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    name: {
        alignSelf: "center",
    },
    title: {
        alignSelf: "center",
        marginTop: 40,
    },
    text: {
        marginLeft: 30,
        fontSize: 16,
    },
    editPopUp: {
        backgroundColor: "white",
        borderRadius: 20,
        margin: 30,
        padding: 20,
        overflow: "hidden",
    },
    editTextInput: {},
    editText: {
        marginTop: 10
    },
    editSubmitButton: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: theme.colors.lightBlue,
    },
    editButton: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        backgroundColor: theme.colors.lightBlue,
    },
    signOutButton: {
        marginTop: 25,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        backgroundColor: theme.colors.lightBlue,
    },
    divider: {
        backgroundColor: theme.colors.purple,
        height: 3,
        width: 340,
        alignSelf: "center"
    },
});

export default ProfileScreen;
