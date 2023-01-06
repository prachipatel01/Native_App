import React from 'react';
import {View, Image, ImageBackground, Pressable} from 'react-native';
import {styles} from '../CSS';
import {baseShadeImages} from '../assets/shades';
import {GoldGradientText} from './Gradient';

export function Shades({navigation, baseShades, token}) {
  return (
    <View style={styles.shadesContainer}>
      {baseShades.map((item, index) => {
        return (
          <ImageBackground
            source={baseShadeImages[item.image]}
            style={styles.shadeUniverseImage}
            imageStyle={styles.shadeUniverseImageStyle}
            key={index}>
            <ImageBackground
              source={require('../assets/images/baseShades/gradient.png')}
              style={styles.shadeUniverseImageGradient}
              imageStyle={styles.shadeUniverseImageStyle}>
              <Pressable
                style={styles.shadeUniverseShades}
                onPress={() =>
                  navigation.navigate('ShadeFromBase', {
                    baseShade: item,
                    token: token,
                  })
                }>
                <GoldGradientText
                  style={[styles.CinzelGoldBold, styles.shadeUniverseText]}>
                  {item.shadeName}
                </GoldGradientText>
                <Image source={require('../assets/icons/rightArrow2.png')} />
              </Pressable>
            </ImageBackground>
          </ImageBackground>
        );
      })}
    </View>
  );
}
