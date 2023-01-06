import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Order} from '../components/Order';
import {styles} from '../CSS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoldGradientText } from '../components/Gradient';

export class OrdersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      orders: null,
    };

    AsyncStorage.getItem('myEuphoriaToken')
      .then(_token => [
        this.setState({
          token: _token,
        }),
      ])
      .then(() => {
        fetch(
          'http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/user/orders',
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
                orders: data.order,
              });
              console.log(data.order);
            }
          });
      })
      .catch(err => {
        alert('Please SignIn again!'),
          this.state.navigation.navigate('SignIn'),
          console.log(err);
      });
  }

  render() {
    return (
      <ScrollView style={styles.body}>
        {this.state.orders &&
          this.state.orders.shadeOrders.map((shade, key) => {
            return (
              <View key={key}>
                <Order
                  name={shade.shadeId.shadeName}
                  color={shade.shadeId.colorCode}
                  createdOn={shade.date}
                  price={shade.total}
                  navigation={this.state.navigation}
                  isRating={true}
                  rating={shade.shadeId.ratings}
                />
              </View>
            );
          })}
        {this.state.orders &&
          this.state.orders.cartridgeOrders.map((cartridge, key) => {
            return (
              <View key={key}>
                <Order
                  name={cartridge.cartridgeShadeName}
                  color={cartridge.cartridgeColorCode}
                  createdOn={cartridge.placedOn}
                  price={cartridge.price}
                  navigation={this.state.navigation}
                  isRating={true}
                  rating={cartridge.ratings}
                  isShade={false}
                />
              </View>
            );
          })}
        {!this.state.orders && (
          <View style={styles.alignJustify}>
            <GoldGradientText>Your Orders Is Empty!</GoldGradientText>
          </View>
        )}
      </ScrollView>
    );
  }
}

export const ShadeOrderStyle = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
  },
});
