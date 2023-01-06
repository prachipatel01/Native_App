import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {Button} from '@react-native-material/core';
import {emptyCartridges} from '../assets/cartridge';
import {styles} from '../CSS';

export function EmptyCartridge() {
  return (
    <View style={EmptyCartridgeStyle.container}>
      <View style={EmptyCartridgeStyle.innerContainer}>
        <Text>UH OH!</Text>
        <Text>
          YOUR CARTRIDGES ARE EXPIRED. TO CREATE THIS SHADE, SHOP HERE.
        </Text>
      </View>
      {emptyCartridges.map((item, index) => {
        return (
          <View key={index} style={EmptyCartridgeStyle.imageContainer}>
            <Text style={EmptyCartridgeStyle.innerComponent}>{item.name}</Text>
            <Image
              source={require('../assets/images/cartridge.jpeg')}
              style={EmptyCartridgeStyle.image}
            />
            <Text style={EmptyCartridgeStyle.innerComponent}>
              {item.usedValue}% Used
            </Text>
            <Text style={EmptyCartridgeStyle.innerComponent}>
              Expires on {item.expireDate}
            </Text>
            <Button
              title="ADD TO CART"
              onPress={() => {
                console.log('Pressed');
              }}
              style={styles.button}
            />
          </View>
        );
      })}
    </View>
  );
}

export const EmptyCartridgeStyle = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  innerContainer: {
    padding: 20,
  },
  image: {
    height: 200,
    width: 200,
  },
  imageContainer: {
    padding: 20,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  innerComponent: {
    padding: 10,
  },
});
