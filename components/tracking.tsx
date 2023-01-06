import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {styles} from '../CSS';
import {GoldGradientText} from './Gradient';

export const Tracking = ({stages, currentTrack}) => {
  return (
    <View style={styles.rowSpaceArround}>
      {stages.map((item, index) => (
        <View key={index}>
          {currentTrack == item ? (
            <View style={styles.rowFlexStart}>
              <Image source={require('../assets/icons/currentTrack.png')} />
              <GoldGradientText style={TrackingStyles.text}>
                {item}
              </GoldGradientText>
            </View>
          ) : (
            <View style={styles.rowFlexStart}>
              <Image source={require('../assets/icons/track.png')} />
              <GoldGradientText style={TrackingStyles.text}>
                {item}
              </GoldGradientText>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const TrackingStyles = StyleSheet.create({
  text: {
    ...styles.CinzelGold,
    fontSize: 12,
    marginLeft: 4,
  },
});
