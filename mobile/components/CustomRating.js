import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

const CustomRating = () => {
  const [value, setValue] = React.useState('threeStar');

  return (
    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View>
        <Text>
            <RadioButton value="oneStar"/>
            <RadioButton value="twoStar"/>
            <RadioButton value="threeStar"/>
            <RadioButton value="fourStar"/>
            <RadioButton value="fiveStar"/>
        </Text>
      </View>
    </RadioButton.Group>
  );
};

export default CustomRating;