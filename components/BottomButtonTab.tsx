import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, dimensions, styles} from '../CSS';
import {GoldButton, GoldGradientText} from './Gradient';

export const BottomButtonTab = ({
  navigation,
  isPrice,
  price,
  text,
  buttonText,
  onPress,
}) => {
  const buttonWidth = isPrice
    ? dimensions.fullWidth / 2 - 20
    : dimensions.fullWidth - 20;
  return (
    <View style={BottomButtonTabStyles.container}>
      {isPrice ? (
        <View style={{width: buttonWidth}}>
          <GoldGradientText
            style={[styles.CinzelGoldBold, BottomButtonTabStyles.smallText]}>
            {text}
          </GoldGradientText>
          <GoldGradientText style={styles.CinzelGold}>{price}</GoldGradientText>
        </View>
      ) : (
        <View />
      )}
      <View>
        <GoldButton
          text={buttonText}
          textStyle={styles.CinzelBlack}
          buttonStyle={[
            BottomButtonTabStyles.buttonStyle,
            {width: buttonWidth},
          ]}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export const BottomFormButtonTab = ({
  navigation,
  button1,
  button2,
  onPress1,
  onPress2,
}) => {
  const buttonWidth = dimensions.fullWidth / 2 - 30;
  return (
    <View style={BottomButtonTabStyles.container}>
      <View style={{margin: 5}}>
        <GoldButton
          text={button1}
          textStyle={styles.CinzelBlack}
          buttonStyle={[
            BottomButtonTabStyles.buttonStyle,
            {width: buttonWidth},
          ]}
          onPress={onPress1}
        />
      </View>
      <View style={{margin: 5}}>
        <GoldButton
          text={button2}
          textStyle={styles.CinzelBlack}
          buttonStyle={[
            BottomButtonTabStyles.buttonStyle,
            {width: buttonWidth},
          ]}
          onPress={onPress2}
        />
      </View>
    </View>
  );
};

const BottomButtonTabStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    padding: 10,
    height: 80,
    backgroundColor: colors.black,
    width: dimensions.fullWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: 10,
  },
  buttonStyle: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
