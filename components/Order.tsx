import React from 'react';
import {StyleSheet, View, Image, Pressable} from 'react-native';
import {colors, styles} from '../CSS';
import {ShadeColor, CartridgeComponent} from './cartComponents';
import LinearGradient from 'react-native-linear-gradient';
import {GoldGradientText} from './Gradient';
import {Ratings} from './ShadeCard';

export function Order({
  navigation,
  name,
  id,
  color,
  price,
  createdOn = '',
  isRating = false,
  rating = 0,
  canRomove = false,
  remove,
  isShade = true,
}) {
  return (
    <View style={ShadeOrderStyle.container}>
      <LinearGradient
        style={ShadeOrderStyle.shadeDetail}
        colors={[colors.grey, colors.darkGrey]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View>
          {canRomove ? (
            <Pressable
              onPress={() => {
                remove(id);
              }}>
              <Image
                source={require('../assets/icons/close.png')}
                style={ShadeOrderStyle.removeShade}
              />
            </Pressable>
          ) : (
            <View />
          )}
          <View style={[styles.rowSpaceBetween, {padding: 10}]}>
            <View style={styles.rowFlexStart}>
              {isShade ? <ShadeColor color={color} /> : <CartridgeComponent />}
              <View style={ShadeOrderStyle.middleContent}>
                <GoldGradientText
                  style={[styles.CinzelGoldBold, ShadeOrderStyle.name]}>
                  {name}
                </GoldGradientText>
                {createdOn != '' ? (
                  <GoldGradientText tyle={styles.CinzelGoldBold}>
                    On {createdOn}
                  </GoldGradientText>
                ) : (
                  <View />
                )}
              </View>
            </View>
            <View style={ShadeOrderStyle.middleContent}>
              <GoldGradientText style={styles.CinzelGoldBold}>
                ${price}
              </GoldGradientText>
            </View>
          </View>
        </View>
      </LinearGradient>
      {isRating ? (
        <LinearGradient
          style={ShadeOrderStyle.ratings}
          colors={[colors.grey, colors.darkGrey]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <GoldGradientText style={[styles.CinzelGoldBold, {fontSize: 14}]}>
            Rate Product
          </GoldGradientText>
          {/* <Text style={styles.normalText}>Rate Product</Text> */}
          <Ratings ratings={rating} style={ShadeOrderStyle.rating} />
          {/* <Icon name="star-o" size={15} color={colors.goldLight}/>
          <Icon name="star-o" size={15} color={colors.goldLight}/>
          <Icon name="star-o" size={15} color={colors.goldLight}/>
          <Icon name="star-o" size={15} color={colors.goldLight}/>
          <Icon name="star-o" size={15} color={colors.goldLight}/> */}
          <View />
        </LinearGradient>
      ) : (
        <View />
      )}
    </View>
  );
}

export const ShadeOrderStyle = StyleSheet.create({
  container: {
    margin: 10,
  },
  removeShade: {
    position: 'absolute',
    right: 0,
    height: 10,
    width: 10,
  },
  shadeDetail: {
    margin: 2,
    padding: 10,
    backgroundColor: colors.grey,
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    padding: 10,
    backgroundColor: colors.grey,
    justifyContent: 'space-between',
  },
  middleContent: {
    padding: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    maxWidth: 200,
  },
  rating: {
    height: 15,
    width: 15,
    margin: 4,
  },
});
