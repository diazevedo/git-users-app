import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import './config/ReactotronConfig';

const Colors = {
  white: '#FFF',
  black: '#000',
  dark: '#002',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const App = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>!!!Welcome to React Native!</Text>

    <Text>Edit App.js file and reload the application.</Text>
  </View>
);

export default App;
