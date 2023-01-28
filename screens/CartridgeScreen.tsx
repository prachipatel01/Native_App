import React, { useContext, useEffect } from 'react';
import {View} from 'react-native';
import {styles} from '../CSS';
import ShopCartridge from '../components/ShopCartridge';
import { CartridgesContext } from '../store/context/cartridges-context';

export const CartridgeScreen = ({navigation}) => {
  const cartridgeContext = useContext(CartridgesContext);

  useEffect(() => {
    cartridgeContext.getToken();
    if(cartridgeContext.token) {
      cartridgeContext.getCartridges(cartridgeContext.token);
    }
  });

  return (
    <View style={[styles.body]}>
      {cartridgeContext.cartridges && (
        <ShopCartridge
          navigation={navigation}
          cartridges={cartridgeContext.cartridges}
          token={cartridgeContext.token}
        />
      )}
    </View>
  );
}
