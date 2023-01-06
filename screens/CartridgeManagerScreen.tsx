import {View, ScrollView, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// import {cartridges} from '../assets/cartridge';
import {
  CartridgeWheel,
  CartridgeDeviceWheel,
} from '../components/CartridgeValueWheel';
import {colors, dimensions, styles} from '../CSS';
import {StyleSheet} from 'react-native';
import {GoldButton, GoldGradientText} from '../components/Gradient';
import LinearGradient from 'react-native-linear-gradient';
import {DeviceContext} from '../store/context/device-context';

export function CartridgeManagerWheel({cartridges}) {
  return (
    <View style={styles.OuterCartridgeCircle}>
      <View style={styles.cartridgesWheel_0}>
        <CartridgeDeviceWheel cartridge={cartridges[0]} />
      </View>
      <View style={styles.cartridgesWheel_1}>
        <CartridgeDeviceWheel cartridge={cartridges[1]} />
      </View>
      <View style={styles.cartridgesWheel_2}>
        <CartridgeDeviceWheel cartridge={cartridges[2]} />
      </View>
      <View style={styles.cartridgesWheel_3}>
        <CartridgeDeviceWheel cartridge={cartridges[3]} />
      </View>
      <View style={styles.cartridgesWheel_4}>
        <CartridgeDeviceWheel cartridge={cartridges[4]} />
      </View>
    </View>
  );
}

export function CartridgeManagerScreen({route, navigation}) {
  const {token} = route.params;
  const [cartridges, setCartridges] = useState();

  const deviceContext = useContext(DeviceContext);

  const getCartridges = () => {
    fetch(
      'http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/cartridge',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
          navigation.navigate('SignIn');
        } else {
          setCartridges(data.cartridges);
        }
      });
  };

  useEffect(() => {
    if (deviceContext.isConnected) {
      getCartridges();
    }
  });

  return (
    <SafeAreaView
      style={{
        ...styles.body,
        alignItems: 'center',
      }}>
      {deviceContext.isConnected && cartridges && (
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <CartridgeManagerWheel cartridges={cartridges} />
          </View>
          <LinearGradient
            style={CartridgeManagerScreenStyle.container}
            colors={[colors.grey, colors.darkGrey]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View>
              <View>
                <GoldGradientText
                  style={{...styles.CinzelGold, margin: 20, marginBottom: 0}}>
                  CARTRIDGE SET
                </GoldGradientText>
              </View>
              <View style={CartridgeManagerScreenStyle.cartridgeSet}>
                <View style={CartridgeManagerScreenStyle.alignRow}>
                  <CartridgeWheel cartridge={cartridges[0]} isShop={true} />
                  <CartridgeWheel cartridge={cartridges[1]} isShop={true} />
                  <CartridgeWheel cartridge={cartridges[2]} isShop={true} />
                </View>
                <View style={CartridgeManagerScreenStyle.alignRow}>
                  <CartridgeWheel cartridge={cartridges[3]} isShop={true} />
                  <CartridgeWheel cartridge={cartridges[4]} isShop={true} />
                </View>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      )}
      {!deviceContext.isConnected && (
        <View style={[styles.alignJustify]}>
          <GoldGradientText>Device is not connected!</GoldGradientText>
          <GoldButton
            textStyle={styles.goldButton}
            buttonStyle={styles.goldButtonText}
            text="DEVICE MANAGER"
            onPress={() => {
              navigation.navigate('DeviceManagerScreen', {
                token: token,
              });
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export const CartridgeManagerScreenStyle = StyleSheet.create({
  container: {
    // minHeight: dimensions.fullHeight - 200,
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: colors.grey,
    width: dimensions.fullWidth - 70,
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    borderColor: colors.goldLight,
    borderWidth: 2,
    width: (dimensions.fullWidth - 40) / 3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cartridgeSet: {
    alignItems: 'center',
    margin: 20,
    marginBottom: 0,
  },
});
