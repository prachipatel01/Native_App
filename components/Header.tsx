import React from 'react';
import {Image, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, styles} from '../CSS';
import {GoldGradientText} from './Gradient';

export function HomePageHeader() {
  return (
    <View style={styles.homeHeader}>
      <View style={styles.homePageHeaderElements}>
        <Image source={require('../assets/icons/decorative.png')} />
      </View>
      <LinearGradient
        colors={[colors.goldLight, colors.goldDark]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.horizontalLine}>
        <View style={styles.horizontalLine}></View>
      </LinearGradient>
      <View style={styles.homePageHeaderElements}>
        <GoldGradientText style={styles.HeaderText}>
          EUPHORIA LIPSTICKS
        </GoldGradientText>
      </View>
      <LinearGradient
        colors={[colors.goldLight, colors.goldDark]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.horizontalLine}>
        <View style={styles.horizontalLine}></View>
      </LinearGradient>
    </View>
  );
}

export function Header({
  navigation,
  isArrow = null,
  name = null,
  isSearch = null,
  isLiked = null,
  isCart = null,
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerContainer}>
        {isArrow ? (
          <Pressable
            style={{padding: 10}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={require('../assets/icons/leftArrow.png')} />
          </Pressable>
        ) : (
          <View />
        )}
        <GoldGradientText style={{...styles.CinzelGold, padding: 10}}>
          {name}
        </GoldGradientText>
      </View>
      <View style={styles.headerIcons}>
        {isSearch ? (
          <Pressable>
            <Image
              source={require('../assets/icons/search.png')}
              style={[styles.goldIcon, styles.headerIcon]}
            />
          </Pressable>
        ) : (
          <View />
        )}
        {isLiked ? (
          <Pressable
            onPress={() => {
              navigation.navigate('LikedShadesScreen');
            }}>
            <Image
              source={require('../assets/icons/heart.png')}
              style={[styles.goldIcon, styles.headerIcon]}
            />
          </Pressable>
        ) : (
          <View />
        )}
        {isCart ? (
          <Pressable
            onPress={() => {
              navigation.navigate('MyCartScreen');
            }}>
            <Image
              source={require('../assets/icons/shoppingCart.png')}
              style={[styles.goldIcon, styles.headerIcon]}
            />
          </Pressable>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}
