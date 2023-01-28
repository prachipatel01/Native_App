import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {BottomButtonTab} from '../components/BottomButtonTab';
import {GoldGradientText} from '../components/Gradient';
import {Order} from '../components/Order';
import {Tracking} from '../components/tracking';
import {colors, dimensions, styles} from '../CSS';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class MyCartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      shadeCart: [],
      cartridgeCart: [],
      calculateTotal: {
        totalMrp: 0,
        totalDiscount: 0,
        total: 0,
        shippingCharge: 0,
      },
      renderTotal: false,
      defaultAddress: {},
      Addresses: [],
    };

    AsyncStorage.getItem('myEuphoriaToken')
      .then(_token => [
        this.setState({
          token: _token,
        }),
      ])
      .then(() => {
        this.getMyCart();
      })
      .then(() => {
        this.getAddress();
      })
      .catch(err => {
        alert('Please SignIn again!'),
          this.state.navigation.navigate('SignIn'),
          console.log(err);
      });
  }

  getAddress = () => {
    fetch(
      'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/user/Addresses',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.state.token,
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
          this.state.navigation.navigate('SignIn');
        } else {
          data.addresses.map((item, index) => {
            if (item.isDefault) {
              this.setState({
                defaultAddress: item,
              });
            }
          });
          this.setState({
            Addresses: data.addresses,
          });
        }
      });
  };

  getMyCart = () => {
    fetch(
      'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/user/myCart',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.state.token,
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
          this.state.navigation.navigate('SignIn');
        } else {
          this.setState({
            shadeCart: data.shades,
            cartridgeCart: data.cartridges,
            calculateTotal: {
              totalMrp: data.mrp,
              totalDiscount: data.discount,
              total: data.total,
              shippingCharge: data.shippingCharge,
            },
          });
          if (this.state.shadeCart.length || this.state.cartridgeCart.length) {
            this.setState({
              renderTotal: true,
            });
          }
        }
      });
  };

  removeShade = shadeId => {
    this.setState({renderTotal: false});
    fetch(
      'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/myCart',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.state.token,
        },
        body: JSON.stringify({shadeId: shadeId}),
      },
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          alert('Error while fetching data, please signin again');
          this.state.navigation.navigate('SignIn');
        }
      })
      .then(() => {
        this.getMyCart();
      });
  };

  removeCartridge = cartridgeId => {
    this.setState({renderTotal: false});
    fetch(
      'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/cartridge/myCart',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.state.token,
        },
        body: JSON.stringify({cartridgeId: cartridgeId}),
      },
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          alert('Error while fetching data, please signin again');
          this.state.navigation.navigate('SignIn');
        }
      })
      .then(() => {
        this.getMyCart();
      });
  };

  render() {
    const placeOrderStages = ['Cart', 'Address', 'Payment'];

    const applyCoupon = () => {
      console.log('apply coupon');
    };

    const changeDefaultAddress = () => {
      this.state.navigation.navigate('AddressScreen');
      this.getAddress();
    };

    const placeOrder = () => {
      console.log('Place Order');
      this.state.navigation.navigate('FunctionalityInProgress');
    };

    return (
      <SafeAreaView
        style={[styles.body, {height: dimensions.fullHeight - 130}]}>
        <ScrollView style={{marginBottom: 80}}>
          <Tracking stages={placeOrderStages} currentTrack="Cart" />
          {this.state.defaultAddress && (
            <View style={MyCartScreenStyle.addressContainer}>
              <GoldGradientText style={MyCartScreenStyle.text}>
                Deliver to : {this.state.defaultAddress.address}
              </GoldGradientText>
              <Pressable
                onPress={() => {
                  changeDefaultAddress();
                }}>
                <Text style={styles.InriaYellowGold}>CHANGE</Text>
              </Pressable>
            </View>
          )}
          <View style={MyCartScreenStyle.shadesContainer}>
            {this.state.shadeCart &&
              this.state.shadeCart.map((item, index) => (
                <Order
                  name={item.shadeName}
                  id={item.id}
                  color={item.colorCode}
                  price={item.price}
                  navigation={this.state.navigation}
                  isRating={false}
                  canRomove={true}
                  remove={this.removeShade}
                  isShade={true}
                  key={index}
                />
              ))}
            {this.state.cartridgeCart &&
              this.state.cartridgeCart.map((item, index) => (
                <Order
                  name={item.cartridgeShadeName}
                  id={item.id}
                  color={item.cartridgeColorCode}
                  price={item.price}
                  navigation={this.state.navigation}
                  isRating={false}
                  canRomove={true}
                  remove={this.removeCartridge}
                  isShade={false}
                  key={index}
                />
              ))}
          </View>
          {this.state.renderTotal && (
            <View>
              <GoldGradientText style={styles.CinzelGoldBold}>
                coupons
              </GoldGradientText>
              <View style={MyCartScreenStyle.couponsContainer}>
                <Pressable
                  onPress={() => {
                    applyCoupon();
                  }}
                  style={[styles.rowSpaceBetween]}>
                  <View style={styles.rowFlexStart}>
                    <Image source={require('../assets/icons/coupon.png')} />
                    <GoldGradientText
                      style={[
                        styles.CinzelGoldBold,
                        MyCartScreenStyle.text,
                        {marginLeft: 10},
                      ]}>
                      Apply Coupon
                    </GoldGradientText>
                  </View>
                  <View>
                    <Image source={require('../assets/icons/rightArrow.png')} />
                  </View>
                </Pressable>
              </View>
              <GoldGradientText style={styles.CinzelGoldBold}>
                Price Details({' '}
                {this.state.shadeCart.length + this.state.cartridgeCart.length}{' '}
                Items )
              </GoldGradientText>
              <View style={MyCartScreenStyle.priceContainer}>
                <View>
                  <View style={styles.rowSpaceBetween}>
                    <GoldGradientText
                      style={[styles.CinzelGoldBold, MyCartScreenStyle.text]}>
                      Total MRP
                    </GoldGradientText>
                    <GoldGradientText
                      style={[styles.CinzelGoldBold, MyCartScreenStyle.text]}>
                      ${this.state.calculateTotal.totalMrp}
                    </GoldGradientText>
                  </View>
                  <View style={styles.rowSpaceBetween}>
                    <GoldGradientText
                      style={[styles.CinzelGoldBold, MyCartScreenStyle.text]}>
                      Discount
                    </GoldGradientText>
                    <GoldGradientText
                      style={[styles.CinzelGoldBold, MyCartScreenStyle.text]}>
                      -${this.state.calculateTotal.totalDiscount}
                    </GoldGradientText>
                  </View>
                  <View style={styles.rowSpaceBetween}>
                    <GoldGradientText
                      style={[styles.CinzelGoldBold, MyCartScreenStyle.text]}>
                      Shipping
                    </GoldGradientText>
                    <GoldGradientText
                      style={[styles.CinzelGoldBold, MyCartScreenStyle.text]}>
                      {this.state.calculateTotal.shippingCharge == 0
                        ? 'Free'
                        : this.state.calculateTotal.shippingCharge}
                    </GoldGradientText>
                  </View>
                </View>
              </View>
            </View>
          )}
          {!this.state.renderTotal && (
            <View style={styles.alignJustify}>
              <GoldGradientText>Your Cart Is Empty!</GoldGradientText>
            </View>
          )}
        </ScrollView>
        {this.state.renderTotal && (
          <BottomButtonTab
            navigation={this.state.navigation}
            isPrice={true}
            buttonText="PLACE ORDER"
            text="Total:"
            price={this.state.calculateTotal.total}
            onPress={placeOrder}
          />
        )}
      </SafeAreaView>
    );
  }
}

const MyCartScreenStyle = StyleSheet.create({
  trackingContainer: {
    ...styles.rowFlexStart,
  },
  addressContainer: {
    ...styles.rowSpaceBetween,
    backgroundColor: colors.darkGrey,
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  shadesContainer: {},
  couponsContainer: {
    backgroundColor: colors.darkGrey,
    padding: 5,
    marginBottom: 20,
    marginTop: 10,
  },
  priceContainer: {
    backgroundColor: colors.darkGrey,
    padding: 5,
    marginBottom: 20,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    maxWidth: (dimensions.fullWidth - 20) / 2,
  },
});
