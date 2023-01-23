import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {dimensions, styles} from '../CSS';
import {Shades} from '../components/Shades';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ShadesScreen extends React.Component {
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
      <SafeAreaView>
        <ScrollView style={styles.body}>
          <Shades
            navigation={this.state.navigation}
            baseShades={this.state.baseShade}
            token={this.state.token}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
