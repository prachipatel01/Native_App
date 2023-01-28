import React, { useContext, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {colors, styles, dimensions} from '../CSS';
import AddShade from '../components/AddShadeButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShadesContext } from '../store/context/shades-context';

export const FavouriteScreen = ({navigation}) => {
  const shadesContext = useContext(ShadesContext);

  useEffect(() => {
    shadesContext.getToken();
    if(shadesContext.token){
      shadesContext.getFavouriteShades(shadesContext.token);
    }
  }, [shadesContext.token]);
  return (
    <SafeAreaView style={FavouritesScreenStyle.container}>
        {shadesContext.favouriteShades && (
          <FlatList
            data={shadesContext.favouriteShades}
            numColumns={4}
            renderItem={({item, index}) => (
              <View key={index} style={FavouritesScreenStyle.component}>
                <AddShade
                  shade={item}
                  token={shadesContext.token}
                  navigation={navigation}
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
  )
}

export const FavouritesScreenStyle = StyleSheet.create({
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
