import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, View} from 'react-native';

import {ShopScreen} from '../screens/ShopScreen';
import {
  CameraScreen,
  CameraContainer,
  CameraPreview,
} from '../screens/CameraScreen';
import {ClosetScreen} from '../screens/ClosetScreen';
import {AccountScreen} from '../screens/AccountScreen';
import {
  AfterShadeIsCreated,
  CreateShadeScreen,
} from '../screens/CreateShadeScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {colors, styles} from '../CSS';
import {Header} from './Header';
import {MyCartScreen} from '../screens/MyCartScreen';
import {OrdersScreen} from '../screens/OrdersScreen';
import {AddressScreen} from '../screens/AddressScreen';
import {PaymentScreen} from '../screens/PaymentScreen';
import {HelpAndSupportScreen} from '../screens/HelpAndSupportScreen';
import {DeviceManagerScreen} from '../screens/DeviceManagerScreen';
import {DeviceTutorialScreen} from '../screens/DeviceTutorialScreen';
import {CartridgeManagerScreen} from '../screens/CartridgeManagerScreen';
import {LogoutScreen} from '../screens/LogoutScreen';
import {AppVersionScreen} from '../screens/AppVersionScreen';
import {UserManualScreen} from '../screens/UserManualScreen';
import {ShadesFromBase} from '../screens/ShadesFromBase';
import {SignUp, SignIn} from '../screens/SignupSignin';
import {AddressForm} from './Form';
import {LikedShadesScreen} from '../screens/LikedShadesScreen';
import DeviceContextProvider from '../store/context/device-context';
import {FunctionalityInProgress} from '../screens/Rough';
import ShadesContextProvider from '../store/context/shades-context';
import TokenContextProvider from '../store/context/token-context';
import CartridgeContextProvider from '../store/context/cartridges-context';
import OrderContextProvider from '../store/context/orders-context';
import AddressContextProvider from '../store/context/address-context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CameraButton() {
  return (
    <View style={styles.cameraButton}>
      <Image
        source={require('../assets/icons/ticket.png')}
        style={styles.bottomTabIcons}
      />
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {height: styles.bottomTab.height},
        tabBarInactiveTintColor: styles.bottomTab.tabBarInactiveTintColor,
        tabBarActiveTintColor: styles.bottomTab.tabBarActiveTintColor,
        tabBarActiveBackgroundColor:
          styles.bottomTab.tabBarActiveBackgroundColor,
        tabBarInactiveBackgroundColor:
          styles.bottomTab.tabBarInactiveBackgroundColor,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icons/home.png')}
              style={styles.bottomTabIcons}
            />
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icons/cart.png')}
              style={styles.bottomTabIcons}
            />
          ),
          header: props => (
            <Header
              name="ALL CATEGORIES"
              isArrow={false}
              isCart={true}
              {...props}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      {/* <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarLabel: 'Camera',
          // tabBarIcon: ({color, size}) => (
          //   <GoldGradient component={CameraButton} style={styles.cameraButton}></GoldGradient>
          // ),
          tabBarIcon: props => <CameraButton />,
          // header: (props) => (<Header name="CAMERA" isArrow={false}/>),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: colors.goldDark,
        }}
      /> */}
      <Tab.Screen
        name="Camera"
        component={FunctionalityInProgress}
        options={{
          tabBarLabel: 'Camera',
          // tabBarIcon: ({color, size}) => (
          //   <GoldGradient component={CameraButton} style={styles.cameraButton}></GoldGradient>
          // ),
          tabBarIcon: props => <CameraButton />,
          // header: (props) => (<Header name="CAMERA" isArrow={false}/>),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: colors.goldDark,
        }}
      />
      <Tab.Screen
        name="Closet"
        component={ClosetScreen}
        options={{
          tabBarLabel: 'Closet',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icons/heart.png')}
              style={styles.bottomTabIcons}
            />
          ),
          header: props => (
            <Header
              name="MY SHADE CLOSET"
              isArrow={false}
              isSearch={true}
              {...props}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icons/profile.png')}
              style={styles.bottomTabIcons}
            />
          ),
          header: props => (
            <Header name="MY ACCOUNT" isArrow={false} {...props} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}

function ScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={
        {
          // headerShown: false,
        }
      }>
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          header: props => <Header name="SIGN UP" {...props} />,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          header: props => <Header name="SIGN IN" {...props} />,
        }}
      />
      <Stack.Screen
        name="FunctionalityInProgress"
        component={FunctionalityInProgress}
        options={{
          header: props => (
            <Header name="VISIT OUR WEBSITE" isArrow={true} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="MyTabsScreen"
        component={MyTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CameraContainer"
        component={CameraContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CameraPreview"
        component={CameraPreview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShadeFromBase"
        component={ShadesFromBase}
        options={{
          header: props => (
            <Header
              name=""
              isArrow={true}
              isLiked={true}
              isCart={true}
              isSearch={true}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CreateShadeScreen"
        component={CreateShadeScreen}
        options={{
          header: props => (
            <Header name="" isArrow={true} isLiked={true} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="AfterShadeIsCreated"
        component={AfterShadeIsCreated}
        options={{
          header: props => (
            <Header name="" isArrow={true} isLiked={true} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="LikedShadesScreen"
        component={LikedShadesScreen}
        options={{
          header: props => (
            <Header name="LIKED SHADES" isArrow={true} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="MyCartScreen"
        component={MyCartScreen}
        options={{
          header: props => (
            <Header
              name="MY CART SHADES"
              isArrow={true}
              isLiked={true}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          header: props => (
            <Header name="MY ORDERS" isArrow={true} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{
          header: props => <Header name="ADDRESS" isArrow={true} {...props} />,
        }}
      />
      <Stack.Screen
        name="AddressFormScreen"
        component={AddressForm}
        options={{
          header: props => <Header name="ADDRESS" isArrow={true} {...props} />,
        }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          header: props => (
            <Header name="PAYEMENT METHODS" isArrow={true} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="HelpAndSupportScreen"
        component={HelpAndSupportScreen}
        options={{
          header: props => (
            <Header name="HELP & SUPPORT" isArrow={true} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="DeviceManagerScreen"
        component={DeviceManagerScreen}
        options={{
          header: props => (
            <Header name="DEVICE MANAGER" isArrow={true} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="DeviceTutorialScreen"
        component={DeviceTutorialScreen}
        options={{
          header: props => (
            <Header name="DEVICE TUTORIAL" isArrow={true} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="CartridgeManagerScreen"
        component={CartridgeManagerScreen}
        options={{
          header: props => (
            <Header name="CARTRIDGE MANAGER" isArrow={true} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="LogoutScreen"
        component={LogoutScreen}
        options={{
          header: props => <Header name="LOGOUT" isArrow={true} {...props} />,
        }}
      />
      <Stack.Screen
        name="UserManualScreen"
        component={UserManualScreen}
        options={{
          header: props => (
            <Header name="USER MANUAL" isArrow={true} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="AppVersionScreen"
        component={AppVersionScreen}
        options={{
          header: props => (
            <Header name="APP VERSION" isArrow={true} {...props} />
          ),
        }}
      />
      {/* <Stack.Screen 
        name="RoughScreen" 
        component={RoughScreen} 
        options={{
          header: (props) => (<Header name="ROUGH SCREEN" isArrow={true}/>),
        }}/> */}
    </Stack.Navigator>
  );
}

export default function DefaultScreen() {
  return (
    <TokenContextProvider>
      <DeviceContextProvider>
        <ShadesContextProvider>
          <CartridgeContextProvider>
            <AddressContextProvider>
              <OrderContextProvider>
                <NavigationContainer>
                  {/* <MyTabs />  */}
                  <ScreenStack />
                </NavigationContainer>
              </OrderContextProvider>
            </AddressContextProvider>
          </CartridgeContextProvider>
        </ShadesContextProvider>
      </DeviceContextProvider>
    </TokenContextProvider>
  );
}
