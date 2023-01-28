import {Text, Pressable} from 'react-native';
import React, {useContext, useState} from 'react';
import {StyleSheet, View, Image, SafeAreaView, ScrollView} from 'react-native';
import {ShadeColor} from '../components/cartComponents';
import {styles, dimensions, colors} from '../CSS';
import {GoldButton, GoldGradientText} from '../components/Gradient';
import LinearGradient from 'react-native-linear-gradient';
import {ShadesContext} from '../store/context/shades-context';

function Button({text, onPress}) {
  return (
    <Pressable
      style={styles.goldButton}
      onPress={() => {
        onPress();
      }}>
      <Text style={styles.CinzelBlack}>{text}</Text>
    </Pressable>
  );
}

export function AfterShadeIsCreated({route, navigation}) {
  const {shade, token, getShades} = route.params;

  const shadesContext = useContext(ShadesContext);
  const addShadeToFavourites = () => {
    shadesContext.getToken();
    if(shadesContext.token){
      shadesContext.addFavouriteShades(shadesContext.token, shade);
      shadesContext.getFavouriteShades(token);
      if(shadesContext.error){
        alert(shadesContext.error);
        navigation.navigate('SignIn');
      } else {
        alert(`shade ${shade.shadeName} has been added to the closet!`)
        navigation.navigate('AfterShadeIsCreated', {
          shade: shade,
          token: shadesContext.token,
        });
      }
    }
  };

  const onPressCreate = () => {
    navigation.navigate('AfterShadeIsCreated', {shade: shade, token: token});
  };
  return (
    <View style={[styles.body, CreateShadeScreenStyle.AfterShadeIsCreated]}>
      <View style={CreateShadeScreenStyle.upperContainer}>
        <View
          style={[
            styles.createdShade,
            {backgroundColor: shade.colorCode},
          ]}></View>
        <GoldGradientText style={styles.CinzelGoldBold}>
          BRAVO !
        </GoldGradientText>
        <GoldGradientText
          style={[styles.CinzelGold, CreateShadeScreenStyle.text]}>
          {shade.shadeName} Shade has been uniquely created for you.
        </GoldGradientText>
      </View>
      <View style={CreateShadeScreenStyle.buttonContainer}>
        <GoldButton
          text="CREATE AGAIN"
          textStyle={[styles.CinzelBlack, styles.goldButtonText]}
          buttonStyle={[styles.goldButton, CreateShadeScreenStyle.goldButton]}
          onPress={onPressCreate}
        />
        <GoldButton
          text="SAVE TO CLOSET"
          textStyle={[styles.CinzelBlack, styles.goldButtonText]}
          buttonStyle={[styles.goldButton, CreateShadeScreenStyle.goldButton]}
          onPress={addShadeToFavourites}
        />
      </View>
    </View>
  );
}

function CreateShadeContainer({navigation, token, shade}) {
  const shadesContext = useContext(ShadesContext);
  const addShadeToRecents = () => {
    shadesContext.getToken();
    if(shadesContext.token){
      shadesContext.addRecentShades(shadesContext.token, shade);
      shadesContext.getRecentShades(token);
      if(shadesContext.error){
        alert(shadesContext.error);
        navigation.navigate('SignIn');
      } else {
        navigation.navigate('AfterShadeIsCreated', {
          shade: shade,
          token: shadesContext.token,
        });
      }
    }
  };

  return (
    <LinearGradient
      style={CreateShadeScreenStyle.createShadeContainer}
      colors={[colors.grey, colors.darkGrey]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={CreateShadeScreenStyle.innerContainer}>
        <ShadeColor color={shade.colorCode} />
        <View>
          <GoldGradientText style={styles.CinzelGold}>
            {shade.shadeName}
          </GoldGradientText>
          {shade.createdOn && (
            <Text style={styles.CinzelWhite}>
              Last Created on {shade.createdOn}
            </Text>
          )}
        </View>
      </View>
      <View>
        <Text
          style={[styles.ReadexWhiteSmall, CreateShadeScreenStyle.description]}>
          Red is a very hot color. It's associated with fire, violence, and
          warfare. It's also associated with love and passion. In history, it's
          been associated with both the Devil and Cupid.
        </Text>
      </View>
      <View style={CreateShadeScreenStyle.buttonContainer}>
        <GoldButton
          text="CREATE SHADE"
          textStyle={[styles.CinzelBlack, styles.goldButtonText]}
          onPress={() => {
            addShadeToRecents();
          }}
        />
      </View>
    </LinearGradient>
  );
}

export function CreateShadeScreen({route, navigation}) {
  const {shade, token} = route.params;
  return (
    <SafeAreaView style={[styles.body, {top:0, bottom: 0, position: 'absolute'}]}>
      <ScrollView contentContainerStyle={CreateShadeScreenStyle.outerContainer}>
        <View style={CreateShadeScreenStyle.image}>
          <Image
            source={require('../assets/images/models/image9.png')}
            style={CreateShadeScreenStyle.image}
          />
          <View style={styles.scrollIcons}>
            <Image
              source={require('../assets/icons/scrollEnable.png')}
              style={styles.enabledIcon}
            />
            <Image
              source={require('../assets/icons/scrollEnable.png')}
              style={styles.disabledIcon}
            />
            <Image
              source={require('../assets/icons/scrollEnable.png')}
              style={styles.disabledIcon}
            />
          </View>
        </View>
        <CreateShadeContainer
          shade={shade}
          navigation={navigation}
          token={token}
        />
        <LinearGradient
          colors={[colors.darkGrey, colors.black]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.tryItOnButton}>
          <Pressable
            onPress={() => {
              navigation.navigate('FunctionalityInProgress');
            }}>
            <GoldGradientText style={styles.CinzelGold}>
              TRY IT ON
            </GoldGradientText>
            {/* <Text style={styles.CinzelGold}>TRY IT ON</Text> */}
          </Pressable>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

export const CreateShadeScreenStyle = StyleSheet.create({
  image: {
    width: dimensions.fullWidth,
    paddingBottom: 20,
  },
  outerContainer: {
    // alignItems: 'center',
    // justifyContent: 'space-between',

  },
  createShadeContainer: {
    padding: 20,
    width: dimensions.fullWidth - 25,
    margin: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  description: {
    padding: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainButton: {},
  tryOnButton: {},
  AfterShadeIsCreated: {
    height: dimensions.fullHeight,
  },
  upperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  goldButton: {
    width: dimensions.fullWidth - 120,
    margin: 10,
  },
  text: {
    textAlign: 'center',
  },
});
