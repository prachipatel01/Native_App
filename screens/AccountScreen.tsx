import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Image,
} from 'react-native';
import {colors, styles} from '../CSS';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {GoldGradientText} from '../components/Gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      user: {},
    };

    AsyncStorage.getItem('myEuphoriaToken')
      .then(_token => {
        this.setState({
          token: _token,
        });
      })
      .then(() => {
        fetch(
          'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/user/details',
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
                user: data.user,
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
      <SafeAreaView>
        <ScrollView style={styles.body}>
          <View style={AccountScreenStyles.userDetails}>
            <View style={AccountScreenStyles.userImage} />
            {this.state.user && (
              <View style={AccountScreenStyles.user}>
                <Text>{this.state.user.name}</Text>
                <Text>{this.state.user.mobile}</Text>
                <Text>{this.state.user.email}</Text>
              </View>
            )}
          </View>
          <View style={AccountScreenStyles.container}>
            <GoldGradientText style={styles.CinzelGoldBold}>
              Account
            </GoldGradientText>
            <LinearGradient
              colors={[colors.grey, colors.darkGrey]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={AccountScreenStyles.gradient}>
              <Pressable
                onPress={() => this.state.navigation.navigate('OrdersScreen')}
                style={AccountScreenStyles.button}>
                <GoldGradientText style={styles.InriaGold}>
                  Orders
                </GoldGradientText>
                <Image source={require('../assets/icons/rightArrow.png')} />
              </Pressable>
            </LinearGradient>
            <LinearGradient
              colors={[colors.grey, colors.darkGrey]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={AccountScreenStyles.gradient}>
              <Pressable
                onPress={() => this.state.navigation.navigate('AddressScreen')}
                style={AccountScreenStyles.button}>
                <GoldGradientText style={styles.InriaGold}>
                  Address
                </GoldGradientText>
                <Image source={require('../assets/icons/rightArrow.png')} />
              </Pressable>
            </LinearGradient>
            <LinearGradient
              colors={[colors.grey, colors.darkGrey]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={AccountScreenStyles.gradient}>
              <Pressable
                onPress={() =>
                  this.state.navigation.navigate('FunctionalityInProgress')
                }
                style={AccountScreenStyles.button}>
                <GoldGradientText style={styles.InriaGold}>
                  Payment Methods
                </GoldGradientText>
                <Image source={require('../assets/icons/rightArrow.png')} />
              </Pressable>
            </LinearGradient>
            <LinearGradient
              colors={[colors.grey, colors.darkGrey]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={AccountScreenStyles.gradient}>
              <Pressable
                onPress={() =>
                  this.state.navigation.navigate('HelpAndSupportScreen')
                }
                style={AccountScreenStyles.button}>
                <GoldGradientText style={styles.InriaGold}>
                  Help & Support
                </GoldGradientText>
                <Image source={require('../assets/icons/rightArrow.png')} />
              </Pressable>
            </LinearGradient>
            <LinearGradient
              colors={[colors.grey, colors.darkGrey]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={AccountScreenStyles.gradient}>
              <Pressable
                onPress={() => this.state.navigation.navigate('LogoutScreen')}
                style={AccountScreenStyles.button}>
                <GoldGradientText style={styles.InriaGold}>
                  Logout
                </GoldGradientText>
                <Image source={require('../assets/icons/rightArrow.png')} />
              </Pressable>
            </LinearGradient>
          </View>
          <View style={AccountScreenStyles.container}>
            <GoldGradientText style={styles.CinzelGoldBold}>
              Devices
            </GoldGradientText>
            <LinearGradient
              colors={[colors.grey, colors.darkGrey]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={AccountScreenStyles.gradient}>
              <Pressable
                onPress={() =>
                  this.state.navigation.navigate('DeviceManagerScreen', {
                    token: this.state.token,
                  })
                }
                style={AccountScreenStyles.button}>
                <GoldGradientText style={styles.InriaGold}>
                  Manage Devices
                </GoldGradientText>
                <Image source={require('../assets/icons/rightArrow.png')} />
              </Pressable>
            </LinearGradient>
            <LinearGradient
              colors={[colors.grey, colors.darkGrey]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={AccountScreenStyles.gradient}>
              <Pressable
                onPress={() =>
                  this.state.navigation.navigate('CartridgeManagerScreen', {
                    token: this.state.token,
                  })
                }
                style={AccountScreenStyles.button}>
                <GoldGradientText style={styles.InriaGold}>
                  Cartridge Manager
                </GoldGradientText>
                <Image source={require('../assets/icons/rightArrow.png')} />
              </Pressable>
            </LinearGradient>
            <LinearGradient
              colors={[colors.grey, colors.darkGrey]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={AccountScreenStyles.gradient}>
              <Pressable
                onPress={() =>
                  this.state.navigation.navigate('FunctionalityInProgress')
                }
                style={AccountScreenStyles.button}>
                <GoldGradientText style={styles.InriaGold}>
                  Device Tutorials
                </GoldGradientText>
                <Image source={require('../assets/icons/rightArrow.png')} />
              </Pressable>
            </LinearGradient>
            <LinearGradient
              colors={[colors.grey, colors.darkGrey]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={AccountScreenStyles.gradient}>
              <Pressable
                onPress={() =>
                  this.state.navigation.navigate('FunctionalityInProgress')
                }
                style={AccountScreenStyles.button}>
                <GoldGradientText style={styles.InriaGold}>
                  User Manual
                </GoldGradientText>
                <Image source={require('../assets/icons/rightArrow.png')} />
              </Pressable>
            </LinearGradient>
            <LinearGradient
              colors={[colors.grey, colors.darkGrey]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={AccountScreenStyles.gradient}>
              <Pressable
                onPress={() =>
                  this.state.navigation.navigate('FunctionalityInProgress')
                }
                style={AccountScreenStyles.button}>
                <GoldGradientText style={styles.InriaGold}>
                  App Version
                </GoldGradientText>
                <Image source={require('../assets/icons/rightArrow.png')} />
              </Pressable>
            </LinearGradient>
            {/* <Pressable
            onPress={() => navigation.navigate('RoughScreen')}
            style={AccountScreenStyles.button}
          >
            <GoldGradientText style={styles.InriaGold}>Rough Screen</GoldGradientText>
            <Icon name="chevron-right" size={10} color={colors.goldLight}/>
          </Pressable> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export const AccountScreenStyles = StyleSheet.create({
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: colors.yellowGold,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  account: {},
  gradient: {
    padding: 20,
    borderColor: 'black',
    // borderWidth: 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.goldLight,
    borderRadius: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: colors.grey,
    // marginTop: 3,
    // marginBottom: 3,
    // padding: 20,
    // borderColor: 'black',
    // // borderWidth: 2,
    // borderBottomWidth: 2,
    // borderBottomColor: colors.goldLight,
    // borderRadius: 5,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    marginRight: 20,
  },
  user: {},
  container: {
    padding: 20,
  },
});
