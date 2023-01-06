import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {colors, dimensions, styles} from '../CSS';
import LinearGradient from 'react-native-linear-gradient';
import {GoldButton, GoldGradientText} from '../components/Gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AddressScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      addresses: [],
    };

    AsyncStorage.getItem('myEuphoriaToken')
      .then(_token => [
        this.setState({
          token: _token,
        }),
      ])
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
      'http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/user/Addresses',
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
            addresses: data.addresses,
          });
        }
      });
  };

  onAddAddress = () => {
    var fdata = {
      name: '',
      mobile: '',
      address: '',
      locality: '',
      city: '',
      state: '',
      pinCode: '',
      isDefault: false,
      type: 'Others',
    };
    this.state.navigation.navigate('AddressFormScreen', {
      token: this.state.token,
      formData: fdata,
      fun: 'save',
      id: null,
    });
  };

  onEditAddress = Address => {
    var fdata = {
      name: Address.name,
      mobile: Address.mobile,
      address: Address.address,
      locality: Address.locality,
      city: Address.city,
      state: Address.state,
      pinCode: Address.pinCode,
      isDefault: Address.isDefault,
      type: Address.type,
    };
    this.state.navigation.navigate('AddressFormScreen', {
      token: this.state.token,
      formData: fdata,
      fun: 'edit',
      id: Address._id,
    });
    this.getAddress();
  };

  onRemoveAddress = AddressId => {
    fetch(
      'http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/user/Addresses',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.state.token,
        },
        body: JSON.stringify({addressId: AddressId}),
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
          this.state.navigation.navigate('SignIn');
        } else {
          this.setState({
            addresses: data.addresses,
          });
        }
      });
  };

  onChangeDefaultAddress = AddressId => {
    fetch(
      'http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/user/Address/changeDefault',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.state.token,
        },
        body: JSON.stringify({addressId: AddressId}),
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
          this.state.navigation.navigate('SignIn');
        } else {
          this.setState({
            addresses: data.addresses,
          });
        }
      });
  };

  render() {
    return (
      <ScrollView style={styles.body}>
        <LinearGradient
          colors={[colors.goldLight, colors.goldDark]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <GoldButton
            text="+ ADD NEW ADDRESS"
            buttonStyle={[styles.goldButton]}
            textStyle={[styles.goldButtonText]}
            onPress={() => {
              this.onAddAddress();
            }}
          />
        </LinearGradient>
        {this.state.addresses && (
          <View>
            <View style={AddressScreenStyle.innerContainer}>
              <GoldGradientText style={styles.InterGold}>
                DEFAULT ADDRESS
              </GoldGradientText>
            </View>
            {this.state.addresses.map((address, key) => {
              if (address.isDefault) {
                return (
                  <Address
                    address={address}
                    onRemoveAddress={this.onRemoveAddress}
                    onEditAddress={this.onEditAddress}
                    onChangeDefaultAddress={this.onChangeDefaultAddress}
                    key={key}
                  />
                );
              }
            })}
          </View>
        )}
        {this.state.addresses && (
          <View>
            <View style={AddressScreenStyle.innerContainer}>
              <GoldGradientText style={styles.InterGold}>
                OTHER ADDRESSES
              </GoldGradientText>
            </View>
            {this.state.addresses.map((address, key) => {
              if (!address.isDefault) {
                return (
                  <Address
                    address={address}
                    onRemoveAddress={this.onRemoveAddress}
                    onEditAddress={this.onEditAddress}
                    onChangeDefaultAddress={this.onChangeDefaultAddress}
                    key={key}
                  />
                );
              }
            })}
          </View>
        )}
      </ScrollView>
    );
  }
}

function Address({
  address,
  onRemoveAddress,
  onEditAddress,
  onChangeDefaultAddress,
}) {
  const [addDefaultButton, setAddDefaultButton] = useState(false);
  const onPressAddress = () => {
    setAddDefaultButton(true);
  };

  return (
    <Pressable
      onPress={() => {
        onPressAddress();
      }}>
      <View>
        <LinearGradient
          style={AddressScreenStyle.innerContainer}
          colors={[colors.grey, colors.darkGrey]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View style={styles.rowSpaceBetween}>
            <GoldGradientText style={styles.CinzelGold}>
              {address.name}
            </GoldGradientText>
            <Text style={styles.type}>{address.type}</Text>
          </View>
          <View>
            <GoldGradientText
              style={[
                styles.CinzelGold,
                {fontSize: 12, lineHeight: 15, padding: 5},
              ]}>
              {address.address}
            </GoldGradientText>
          </View>
          <View>
            <GoldGradientText
              style={[
                styles.CinzelGold,
                {fontSize: 12, lineHeight: 15, padding: 5},
              ]}>
              Mobile: {address.mobile}
            </GoldGradientText>
          </View>
          {address.isDefault && (
            <View style={styles.rowSpaceEvenly}>
              <GoldButton
                text="EDIT"
                buttonStyle={[styles.goldButton, AddressScreenStyle.button]}
                textStyle={[styles.goldButtonText]}
                onPress={() => {
                  onEditAddress(address);
                }}
              />
              <GoldButton
                text="REMOVE"
                buttonStyle={[styles.goldButton, AddressScreenStyle.button]}
                textStyle={[styles.goldButtonText]}
                onPress={() => {
                  onRemoveAddress(address._id);
                }}
              />
            </View>
          )}
          {!address.isDefault && addDefaultButton && (
            <View style={styles.rowSpaceArround}>
              <GoldButton
                text="SET DEFAULT ADDRESS"
                buttonStyle={[
                  styles.goldButton,
                  {width: dimensions.fullWidth - 100},
                ]}
                textStyle={[styles.goldButtonText]}
                onPress={() => {
                  onChangeDefaultAddress(address._id);
                }}
              />
            </View>
          )}
        </LinearGradient>
      </View>
    </Pressable>
  );
}

export const AddressScreenStyle = StyleSheet.create({
  innerContainer: {
    padding: 15,
    margin: 5,
  },
  button: {
    width: (dimensions.fullWidth - 50) / 2,
    margin: 5,
  },
});
