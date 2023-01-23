import {Text, Pressable} from 'react-native';
import React, {useContext, useState} from 'react';
import {StyleSheet, View, Image, SafeAreaView, ScrollView} from 'react-native';
import {ShadeColor} from '../components/cartComponents';
import {styles, dimensions, colors} from '../CSS';
import {GoldButton, GoldGradientText} from '../components/Gradient';
import LinearGradient from 'react-native-linear-gradient';

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

  const addShadeToFavourites = () => {
    fetch(
      'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/favourites',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({shadeId: shade._id}),
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
          navigation.navigate('SignIn');
        } else {
          getShades();
        }
      });
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
  const addShadeToRecents = () => {
    fetch(
      'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/recents',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({shadeId: shade._id}),
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
          navigation.navigate('SignIn');
        } else {
          navigation.navigate('AfterShadeIsCreated', {
            shade: shade,
            token: token,
          });
        }
      });
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
    <SafeAreaView style={styles.body}>
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
    alignItems: 'center',
  },
  createShadeContainer: {
    // alignItems: 'center',
    padding: 20,
    // backgroundColor: colors.grey,
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
