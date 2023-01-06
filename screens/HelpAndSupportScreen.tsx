import {View, StyleSheet} from 'react-native';
import React from 'react';
import {colors, dimensions, styles} from '../CSS';
import {GoldGradientText} from '../components/Gradient';

export function HelpAndSupportScreen() {
  return (
    <View style={styles.body}>
      <View style={[HelpAndSupportScreenStyle.container]}>
        <GoldGradientText style={HelpAndSupportScreenStyle.text}>
          If you need help with your device, you may find an answerbin the User
          Manual or Troubleshooting section.
        </GoldGradientText>
        <GoldGradientText style={HelpAndSupportScreenStyle.boldText}>
          Need additional Support ?
        </GoldGradientText>
        <GoldGradientText style={HelpAndSupportScreenStyle.boldText}>
          Website: https://euphoriacosmetics.github.io/EuphoriaCosmetics/
        </GoldGradientText>
        <GoldGradientText style={HelpAndSupportScreenStyle.boldText}>
          Call : 9558040400
        </GoldGradientText>
      </View>
    </View>
  );
}

export const HelpAndSupportScreenStyle = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: colors.black,
    padding: 20,
    height: dimensions.fullHeight,
  },
  text: {
    padding: 5,
  },
  boldText: {
    fontWeight: 'bold',
    padding: 5,
  },
});
