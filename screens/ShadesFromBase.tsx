import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {ShadeCard} from '../components/ShadeCard';
import {colors, styles} from '../CSS';

export function ShadesFromBase({route, navigation}) {
  const {baseShade, token} = route.params;
  const [baseShadeDerivatives, setBaseShadeDerivatives] = useState();

  useEffect(() => {
    fetch(
      'http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/shade/shades/' +
        baseShade.shadeName,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
          navigation.navigate('SignIn');
        } else {
          setBaseShadeDerivatives(data.shades);
        }
      });
  }, []);

  return (
    <SafeAreaView style={{...styles.body, ...ShadesFromBaseStyle.container}}>
      {baseShadeDerivatives && (
        <FlatList
          data={baseShadeDerivatives}
          numColumns={2}
          renderItem={({item, index}) => (
            <ShadeCard
              shade={item}
              key={index}
              navigation={navigation}
              token={token}
              isLiked={item.isLiked}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const ShadesFromBaseStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    alignItems: 'center',
  },
});
