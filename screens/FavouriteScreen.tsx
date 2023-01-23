import React from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {colors, styles, dimensions} from '../CSS';
import AddShade from '../components/AddShadeButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class FavouriteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      favouriteShades: [],
    };

    AsyncStorage.getItem('myEuphoriaToken')
      .then(_token => [
        this.setState({
          token: _token,
        }),
      ])
      .then(() => {
        fetch(
          'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/favourites',
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
                favouriteShades: data.favourites,
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
      <SafeAreaView style={FavouritesScreenStyle.container}>
        {this.state.favouriteShades && (
          <FlatList
            data={this.state.favouriteShades}
            numColumns={4}
            renderItem={({item, index}) => (
              <View key={index} style={FavouritesScreenStyle.component}>
                <AddShade
                  shade={item}
                  token={this.state.token}
                  navigation={this.state.navigation}
                />
                {item.createdOn && (
                  <Text style={{...styles.InterGold, color: colors.goldLight}}>
                    Created on
                  </Text>
                )}
                {item.createdOn && (
                  <Text style={{...styles.InterGold, color: colors.goldLight}}>
                    {item.createdOn}
                  </Text>
                )}
              </View>
            )}
          />
        )}
      </SafeAreaView>
    );
  }
}

export const FavouritesScreenStyle = StyleSheet.create({
  component: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  container: {
    paddingTop: 25,
    padding: 10,
    // width: dimensions.fullWidth,
    height: dimensions.fullHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
});
