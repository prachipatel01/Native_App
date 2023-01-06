/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DefaultScreen from './components/BottomTabButton';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        {/* <Text style={styles.CinzelBlack}>Hello</Text> */}
        <DefaultScreen />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default App;
