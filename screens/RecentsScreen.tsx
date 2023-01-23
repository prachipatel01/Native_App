import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {colors, dimensions, styles} from '../CSS';
import AddShade from '../components/AddShadeButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {RecentsContext} from '../store/context/recents-context';

export class RecentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      recentShades: [],
    };

    AsyncStorage.getItem('myEuphoriaToken')
      .then(_token => [
        this.setState({
          token: _token,
        }),
      ])
      .then(() => {
        this.getShade();
      })
      .catch(err => {
        alert('Please SignIn again!'),
          this.state.navigation.navigate('SignIn'),
          console.log(err);
      });
  }

  getShade = () => {
    fetch(
      'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/recents',
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
            recentShades: data.recents,
          });
        }
      });
  };

  render() {
    return (
      <SafeAreaView style={RecentsScreenStyle.container}>
        {this.state.recentShades && (
          <FlatList
            data={this.state.recentShades}
            numColumns={4}
            renderItem={({item, index}) => (
              <View key={index} style={RecentsScreenStyle.component}>
                <AddShade
                  navigation={this.state.navigation}
                  shade={item}
                  token={this.state.token}
                  getShade={this.getShade}
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

// export const RecentsScreen = ({navigation}) => {
//   const recentContext = useContext(RecentsContext);

//   useEffect(() => {
//     recentContext.getToken();
//     recentContext.getRecentShades();
//   }, []);
//   return (
//     <SafeAreaView style={RecentsScreenStyle.container}>
//       {recentContext.recentShades && (
//         <FlatList
//           data={recentContext.recentShades}
//           numColumns={4}
//           renderItem={({item, index}) => (
//             <View key={index} style={RecentsScreenStyle.component}>
//               <AddShade
//                 navigation={navigation}
//                 shade={item}
//                 token={recentContext.token}
//               />
//               {item.createdOn && (
//                 <Text style={{...styles.InterGold, color: colors.goldLight}}>
//                   Created on
//                 </Text>
//               )}
//               {item.createdOn && (
//                 <Text style={{...styles.InterGold, color: colors.goldLight}}>
//                   {item.createdOn}
//                 </Text>
//               )}
//             </View>
//           )}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

export const RecentsScreenStyle = StyleSheet.create({
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
