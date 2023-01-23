import React from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../CSS';
import {SafeAreaView, ScrollView} from 'react-native';
import {Shades} from '../components/Shades';
import {HomePageHeader} from '../components/Header';
import {GoldGradientText} from '../components/Gradient';
import {ShadeCarousel} from '../components/ShadeCarousel';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      baseShade: [],
    };

    AsyncStorage.getItem('myEuphoriaToken')
      .then(_token => [
        this.setState({
          token: _token,
        }),
      ])
      .then(() => {
        fetch(
          'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/baseShades',
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
              data.baseShades.map((item, index) => {
                // console.log(data.baseShades[index].image)
              });
              this.setState({
                baseShade: data.baseShades,
              });
              // this.state.baseShade = data.baseShades;
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
      <SafeAreaView style={styles.body}>
        <ScrollView>
          <HomePageHeader />
          <View style={styles.CommercialContainer}>
            <GoldGradientText style={styles.CinzelGold}>
              Commercial
            </GoldGradientText>
          </View>
          <View>
            {this.state.token && (
              <ShadeCarousel
                navigation={this.state.navigation}
                token={this.state.token}
              />
            )}
          </View>
          <View style={{marginTop: 30, marginBottom: 20}}>
            <Text style={{...styles.ReadexWhite, paddingLeft: 20}}>
              Dive into our
            </Text>
            <Text style={{...styles.ReadexWhite, paddingLeft: 20}}>
              Shade Universes
            </Text>
            <Shades
              navigation={this.state.navigation}
              baseShades={this.state.baseShade}
              token={this.state.token}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
