import React from 'react';
import {View, Image, FlatList, SafeAreaView} from 'react-native';
import {StyleSheet} from 'react-native';
// import {cartridges} from '../assets/cartridge';
import {colors, dimensions, styles} from '../CSS';
import {GoldButton, GoldGradientText} from './Gradient';

export default function ShopCartridge({navigation, cartridges, token}) {
  const addCartridgeToCart = cartridgeName => {
    fetch(
      'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/cartridge/myCart',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({cartridge: cartridgeName}),
      },
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          alert('Error while fetching data, please signin again');
          navigation.navigate('SignIn');
        } else {
          alert(`${cartridgeName} is added to your cart`);
        }
      });
  };

  return (
    <SafeAreaView style={ShopCartridgeStyle.container}>
      <FlatList
        data={cartridges}
        numColumns={2}
        renderItem={({item, index}) => (
          <View style={ShopCartridgeStyle.card} key={index}>
            <Image
              source={require('../assets/images/cartridge.png')}
              style={ShopCartridgeStyle.image}
            />
            <View style={ShopCartridgeStyle.title}>
              <GoldGradientText style={{...styles.CinzelGold, maxWidth: 150}}>
                {item.cartridgeShadeName}
              </GoldGradientText>
            </View>
            <View>
              {item.usedValue && (
                <GoldGradientText
                  style={{...styles.ReadexGold, fontSize: 5, lineHeight: 6}}>
                  {item.usedValue}% Used
                </GoldGradientText>
              )}
              {item.expireDate && (
                <GoldGradientText
                  style={{...styles.ReadexGold, fontSize: 5, lineHeight: 6}}>
                  Expires on {item.expireDate}
                </GoldGradientText>
              )}
            </View>
            <GoldButton
              text="ADD TO CART"
              textStyle={ShopCartridgeStyle.buttonText}
              buttonStyle={ShopCartridgeStyle.button}
              onPress={() => {
                addCartridgeToCart(item.cartridgeShadeName);
              }}
            />
            {/* <GoldGradient component={Button} style={{margin: 5, maxWidth: 250}}></GoldGradient> */}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export const ShopCartridgeStyle = StyleSheet.create({
  button: {
    ...styles.goldButton,
    margin: 5,
    height: 20,
  },
  buttonText: {
    ...styles.CinzelBlack,
    fontSize: 8,
    lineHeight: 11,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  card: {
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.goldLight,
    margin: 10,
    width: (dimensions.fullWidth - 40) / 2,
    minHeight: 165,
    justifyContent: 'space-evenly',
    // flex: 1,
    // flexDirection: 'column',
    // margin: 10,
  },
  title: {
    position: 'absolute',
    marginTop: 10,
  },
  image: {
    // height: 50,
    width: (dimensions.fullWidth - 120) / 2,
    margin: 10,
  },
});
