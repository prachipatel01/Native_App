import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CartridgeScreen} from '../screens/CartridgeScreen';
import {ShadesScreen} from '../screens/ShadesScreen';
import {RecentsScreen} from '../screens/RecentsScreen';
import {FavouriteScreen} from '../screens/FavouriteScreen';
import {colors} from '../CSS';

const Tab = createMaterialTopTabNavigator();

export function TopTabShop() {
  return (
    <Tab.Navigator
      initialRouteName="ShadesScreen"
      screenOptions={{
        tabBarActiveTintColor: colors.goldLight,
        tabBarLabelStyle: {color: colors.goldLight},
        tabBarStyle: {backgroundColor: colors.black},
        tabBarIndicatorStyle: {backgroundColor: colors.goldLight},
      }}>
      <Tab.Screen name="ShadesScreen" component={ShadesScreen} />
      <Tab.Screen name="CartridgeScreen" component={CartridgeScreen} />
    </Tab.Navigator>
  );
}

export function TopTabCloset() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.goldLight,
        tabBarLabelStyle: {color: colors.goldLight},
        tabBarStyle: {backgroundColor: colors.black},
        tabBarIndicatorStyle: {backgroundColor: colors.goldLight},
      }}>
      <Tab.Screen name="Recents" component={RecentsScreen} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
    </Tab.Navigator>
  );
}
