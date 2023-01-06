import React from 'react';
import {View} from 'react-native';
import {GoldGradientText} from '../components/Gradient';
import {dimensions, styles} from '../CSS';

export function FunctionalityInProgress() {
  return (
    <View
      style={[
        styles.body,
        styles.alignJustify,
        {height: dimensions.fullHeight},
      ]}>
      <GoldGradientText>This Functionality is in progress.</GoldGradientText>
      <GoldGradientText>
        Please Visit our website to know more.
      </GoldGradientText>
      <GoldGradientText>
        https://euphoriacosmetics.github.io/EuphoriaCosmetics/
      </GoldGradientText>
    </View>
  );
}
