import React from 'react';
import {View} from 'react-native';
import {dimensions, styles} from '../CSS';
import ShopCartridge from '../components/ShopCartridge';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class CartridgeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      cartridges: [],
    };

    AsyncStorage.getItem('myEuphoriaToken')
      .then(_token => [
        this.setState({
          token: _token,
        }),
      ])
      .then(() => {
        fetch(
          'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/cartridge',
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
                cartridges: data.cartridges,
              });
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
      <View style={[styles.body]}>
        {this.state.cartridges && (
          <ShopCartridge
            navigation={this.state.navigation}
            cartridges={this.state.cartridges}
            token={this.state.token}
          />
        )}
      </View>
    );
  }
}
