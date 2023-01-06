import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {StyleSheet} from 'react-native';
import {styles} from '../CSS';
import {GoldButton, GoldGradient, GoldGradientText} from './Gradient';

const InnerWheelStyle = (color: string) => {
  return {...styles.cartridgeWheelInner, backgroundColor: color};
};
const OuterWheelStyle = (color: string) => {
  return {...styles.cartridgeWheelOuter, borderColor: color};
};
const DeviceInnerWheelStyle = (color: string) => {
  return {...styles.cartridgeDeviceInnerWheel, backgroundColor: color};
};
function Button() {
  return (
    <Pressable
      style={{
        ...styles.goldButton,
        paddingTop: 0,
        paddingBottom: 0,
        height: 20,
        width: 40,
      }}>
      <Text
        style={{
          ...styles.CinzelBlack,
          fontSize: 8,
          lineHeight: 20,
          minWidth: 30,
        }}>
        SHOP
      </Text>
    </Pressable>
  );
}

export function CartridgeWheel({
  cartridge,
  isShop,
  isConnected = true,
}) {
  return (
    <View style={CartridgeWheelStyle.container}>
      <View style={OuterWheelStyle(cartridge.cartridgeColorCode)}>
        <View style={InnerWheelStyle(cartridge.cartridgeColorCode)}>
          {cartridge.usedValue && (
            <Text style={styles.InterWhite}>{cartridge.usedValue}%</Text>
          )}
        </View>
      </View>
      <View style={styles.alignJustify}>
        <GoldGradientText style={styles.InterGold}>
          {cartridge.cartridgeDeviceId}
        </GoldGradientText>
        {cartridge.expireDate && (
          <GoldGradientText style={styles.InterGold}>
            EXP {cartridge.expireDate}
          </GoldGradientText>
        )}
      </View>
      {!isConnected && (
        <View style={styles.alignJustify}>
          <GoldGradientText style={styles.InterGold}>
            {cartridge.cartridgeDeviceId}
          </GoldGradientText>
          <GoldGradientText style={styles.InterGold}>
            Not connected
          </GoldGradientText>
          <GoldButton
            textStyle={[styles.goldButtonText, CartridgeWheelStyle.buttonText]}
            buttonStyle={[styles.goldButton, CartridgeWheelStyle.button]}
            text="RELOAD"
            onPress={() => {}}
          />
        </View>
      )}
      {isShop ? (
        <GoldButton
          textStyle={[styles.goldButtonText, CartridgeWheelStyle.buttonText]}
          buttonStyle={[styles.goldButton, CartridgeWheelStyle.button]}
          text="SHOP"
          onPress={() => {}}
        />
      ) : (
        <View />
      )}
    </View>
  );
}

export function CartridgeDeviceWheel({cartridge}) {
  return (
    <View>
      <View style={styles.cartridgeDeviceOuterWheel}>
        <View style={DeviceInnerWheelStyle(cartridge.cartridgeColorCode)}>
          <Text>{cartridge.cartridgeDeviceId}</Text>
        </View>
      </View>
    </View>
  );
}

const CartridgeWheelStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  buttonText: {
    margin: 0,
    fontSize: 8,
    lineHeight: 20,
    minWidth: 30,
  },
  button: {
    paddingTop: 0,
    paddingBottom: 0,
    height: 20,
    width: 40,
    margin: 5,
    maxWidth: 100,
  },
});
