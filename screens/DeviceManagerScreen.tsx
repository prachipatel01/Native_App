import {View, Image, Pressable, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// import {cartridges} from '../assets/cartridge';
import {CartridgeWheel} from '../components/CartridgeValueWheel';
import {colors, dimensions, styles} from '../CSS';
import {StyleSheet} from 'react-native';
import {GoldButton, GoldGradientText} from '../components/Gradient';
import LinearGradient from 'react-native-linear-gradient';
import {DeviceContext} from '../store/context/device-context';

export function DeviceManagerScreen({route, navigation}) {
  const {token} = route.params;
  const [cartridges, setCartridges] = useState();

  const deviceContext = useContext(DeviceContext);

  const connectDevice = () => {
    deviceContext.connectWithDevice();
    getCartridges();
  };

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
    <ScrollView style={{...styles.body, height: dimensions.fullHeight}}>
      <LinearGradient
        style={DeviceManagerScreenStyle.container}
        colors={[colors.grey, colors.darkGrey]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={{margin: 20}}>
          <View style={DeviceManagerScreenStyle.spaceBetween}>
            <GoldGradientText style={styles.CinzelGold}>
              Your Device
            </GoldGradientText>
            {deviceContext.isConnected && (
              <GoldGradientText style={styles.InterGold}>
                {deviceContext.battery}%
              </GoldGradientText>
            )}
          </View>
          <View>
            {deviceContext.isConnected && (
              <GoldGradientText style={styles.InriaGold}>
                Connected
              </GoldGradientText>
            )}
            {!deviceContext.isConnected && (
              <GoldGradientText style={styles.InriaGold}>
                Disconnected
              </GoldGradientText>
            )}
          </View>
        </View>
        {deviceContext.isConnected ? (
          <View>
            {cartridges && (
              <View>
                <View>
                  <GoldGradientText style={{...styles.CinzelGold, margin: 20}}>
                    CARTRIDGE SET
                  </GoldGradientText>
                </View>
                <View style={DeviceManagerScreenStyle.cartridgeSet}>
                  <View style={DeviceManagerScreenStyle.alignRow}>
                    <CartridgeWheel
                      cartridge={cartridges[0]}
                      isShop={false}
                      isConnected={deviceContext.C1}
                    />
                    <CartridgeWheel
                      cartridge={cartridges[1]}
                      isShop={false}
                      isConnected={deviceContext.C2}
                    />
                    <CartridgeWheel
                      cartridge={cartridges[2]}
                      isShop={false}
                      isConnected={deviceContext.C3}
                    />
                  </View>
                  <View style={DeviceManagerScreenStyle.alignRow}>
                    <CartridgeWheel
                      cartridge={cartridges[3]}
                      isShop={false}
                      isConnected={deviceContext.C4}
                    />
                    <CartridgeWheel
                      cartridge={cartridges[4]}
                      isShop={false}
                      isConnected={deviceContext.C5}
                    />
                  </View>
                </View>
              </View>
            )}
            <View style={DeviceManagerScreenStyle.optionButtons}>
              <Pressable
                style={DeviceManagerScreenStyle.optionButton}
                onPress={() => {
                  navigation.navigate('CartridgeManagerScreen', {
                    token: token,
                  });
                }}>
                <Image
                  source={require('../assets/icons/threeDots.png')}
                  style={{...styles.goldIcon, margin: 10}}
                />
                <GoldGradientText style={styles.InterGold}>
                  Cartridge Manager
                </GoldGradientText>
              </Pressable>
              <Pressable style={DeviceManagerScreenStyle.optionButton}>
                <Image
                  source={require('../assets/icons/lock.png')}
                  style={{...styles.goldIcon, margin: 10}}
                />
                <GoldGradientText style={styles.InterGold}>
                  Travel Mode
                </GoldGradientText>
              </Pressable>
              <Pressable style={DeviceManagerScreenStyle.optionButton}>
                <Image
                  source={require('../assets/icons/questionMark.png')}
                  style={{...styles.goldIcon, margin: 10}}
                />
                <GoldGradientText style={styles.InterGold}>
                  Help & Support
                </GoldGradientText>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.optionButton}>
            <GoldButton
              text="CONNECT DEVICE"
              textStyle={styles.goldButtonText}
              buttonStyle={styles.goldButton}
              onPress={() => {
                connectDevice();
              }}
            />
          </View>
        )}
      </LinearGradient>
    </ScrollView>
  );
}

export const DeviceManagerScreenStyle = StyleSheet.create({
  container: {
    // height: dimensions.fullHeight - 200,
    justifyContent: 'space-between',
    margin: 20,
    backgroundColor: colors.grey,
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
