import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {dimensions, styles} from '../CSS';

export function CameraButton({shade, onPress}) {
  const width = dimensions.fullWidth;
  return (
    <Pressable
      style={[CameraButtonStyle.container, {width: width}]}
      onPress={() => {
        onPress(shade);
      }}>
      <View
        style={{...styles.onClickCamera, backgroundColor: shade.color}}></View>
    </Pressable>
  );
}

const CameraButtonStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
