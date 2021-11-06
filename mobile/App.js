import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import colors from './assets/colors/colors';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'WorkSans-Black': require('./assets/fonts/WorkSans-Black.ttf')
  });
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'Montserrat-Bold'}}>Open up App.js to start working on your app! cur test12345WORK</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
