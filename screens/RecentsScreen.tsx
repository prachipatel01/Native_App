import React, {useContext, useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {colors, dimensions, styles} from '../CSS';
import AddShade from '../components/AddShadeButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ShadesContext} from '../store/context/shades-context';
import { GoldGradientText } from '../components/Gradient';

export const RecentsScreen = ({navigation}) => {
  const shadesContext = useContext(ShadesContext);

  useEffect(() => {
    shadesContext.getToken();
    if(shadesContext.token){
      shadesContext.getRecentShades(shadesContext.token);
    }
  }, [shadesContext.token]);
  return (
    <SafeAreaView style={RecentsScreenStyle.container}>
      {shadesContext.recentShades && (
        <FlatList
          data={shadesContext.recentShades}
          numColumns={4}
          renderItem={({item, index}) => (
            <View key={index} style={RecentsScreenStyle.component}>
              <AddShade
                navigation={navigation}
                shade={item}
                token={shadesContext.token}
              />
              {item.createdOn && (
                <Text style={{...styles.InterGold, color: colors.goldLight}}>
                  Created on
                </Text>
              )}
              {item.createdOn && (
                <Text style={{...styles.InterGold, color: colors.goldLight}}>
                  {item.createdOn}
                </Text>
              )}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export const RecentsScreenStyle = StyleSheet.create({
  component: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  container: {
    paddingTop: 25,
    padding: 10,
    // width: dimensions.fullWidth,
    height: dimensions.fullHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
});
