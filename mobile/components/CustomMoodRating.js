import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

const CustomMoodRating = (props) => {
    return (
        <RadioButton.Group onValueChange={newValue => props.setMood(newValue)} value={props.mood}>
            <View>
                <Text style={{fontSize:30}}>
                    <RadioButton value="1"/>
                    ☹️
                    <RadioButton value="2"/>
                    🙁
                    <RadioButton value="3"/>
                    😐
                    <RadioButton value="4"/>
                    🙂
                    <RadioButton value="5"/>
                    😀
                </Text>
            </View>
            {/* <Text>{value}</Text> */}
        </RadioButton.Group>

    );
};

export default CustomMoodRating;