import React, {useState} from "react";
import {TextInput} from "react-native-paper";
import {Platform, StyleSheet, View} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = (props) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateObj, setDateObj] = useState(new Date(props.date));

    const dateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateObj;
        setShowDatePicker(Platform.OS === "ios"); // IDK
        props.setDate(currentDate.toLocaleDateString());
        setDateObj(currentDate);
        if (props.setLoaded != null) {
            props.setLoaded(false);
        }
    }

    return (
        <View>
            {showDatePicker && (
                <DateTimePicker
                    value={dateObj}
                    mode="date"
                    display="default"
                    onChange={dateChange}
                />)}
            <TextInput
                onFocus={() => setShowDatePicker(true)}
                disabled={true}
                placeholder={props.date}
                right={<TextInput.Icon name="calendar" onPress={() => setShowDatePicker(true)}/>}

                mode="outlined"
                dense={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({});

export default CustomDatePicker;
