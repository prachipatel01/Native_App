import React from 'react';
import {Text, Pressable} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../CSS';

export const GoldGradientText = props => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[colors.goldLight, colors.goldDark]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

export const GreyGradientText = props => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[colors.grey, colors.black]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

export const GoldGradient = ({
  component: Component,
  style: style,
  props: props,
  componentStyle: componentStyle,
}) => {
  return (
    <LinearGradient
      colors={[colors.goldLight, colors.goldDark]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={style}>
      <Component props={props} style={componentStyle} />
    </LinearGradient>
  );
};

export const GreyGradient = ({
  component: Component,
  style: style,
  props: props,
  componentStyle: componentStyle,
}) => {
  return (
    <LinearGradient
      colors={[colors.grey, colors.black]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={style}>
      <Component props={props} style={componentStyle} />
    </LinearGradient>
  );
};

export const GoldButton = ({
  text: text,
  textStyle: textStyle,
  buttonStyle: buttonStyle,
  onPress: onPress,
}) => {
  return (
    <LinearGradient
      colors={[colors.goldLight, colors.goldDark]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={buttonStyle}>
      <Pressable
        onPress={() => {
          onPress();
        }}
        style={buttonStyle}>
        <Text style={textStyle}>{text}</Text>
      </Pressable>
    </LinearGradient>
  );
};
