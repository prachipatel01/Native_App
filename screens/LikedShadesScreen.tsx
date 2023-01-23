import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {ShadeCard} from '../components/ShadeCard';
import {colors, dimensions, styles} from '../CSS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoldGradientText} from '../components/Gradient';

export class LikedShadesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      likedShades: [],
    };

    AsyncStorage.getItem('myEuphoriaToken')
      .then(_token => [
        this.setState({
          token: _token,
        }),
      ])
      .then(() => {
        fetch(
          'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/liked',
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
                likedShades: data.likedShades,
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
      <View style={{backgroundColor: colors.black}}>
        <SafeAreaView
          style={[
            styles.body,
            LikedShadesScreenStyle.container,
            {minHeight: dimensions.fullHeight - 130},
          ]}>
          {this.state.likedShades ? (
            <FlatList
              data={this.state.likedShades}
              numColumns={2}
              renderItem={({item, index}) => (
                <ShadeCard
                  shade={item}
                  key={index}
                  navigation={this.state.navigation}
                  token={this.state.token}
                  isLiked={true}
                />
              )}
            />
          ) : (
            <GoldGradientText style={styles.CinzelGold}>
              Liked Shades are Empty!
            </GoldGradientText>
          )}
        </SafeAreaView>
      </View>
    );
  }
}

const LikedShadesScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    // height: dimensions.fullHeight - 150,
    alignItems: 'center',
  },
});
