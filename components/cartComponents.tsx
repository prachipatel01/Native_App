import React from 'react';
import {Image, View} from 'react-native';
import {colors} from '../CSS';

function InnerCircle({color}) {
  const innerCircle = {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginRight: 10,
    backgroundColor: color,
    position: 'absolute',
  };
  return <View style={innerCircle}></View>;
}

export function ShadeColor({color}) {
  const outerCircle = {
    height: 38,
    width: 38,
    borderRadius: 19,
    marginRight: 10,
    borderColor: colors.goldLight,
    borderWidth: 2,
    // position: 'absolute',
  };
  return (
    <View style={outerCircle}>
      <InnerCircle color={color} />
    </View>
  );
}

export function CartridgeComponent() {
  const style = {
    height: 38,
    width: 38,
  };
  return (
    <Image source={require('../assets/images/cartridge.png')} style={style} />
  );
}
