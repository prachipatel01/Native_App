import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Shades} from '../assets/shades';
import {CameraButton} from '../components/CameraButton';

export default function CameraCarousel({navigation, token}) {
  const takePic = Shade => {
    navigation.navigate('CreateShadeScreen', {
      shade: Shade,
      token: '',
    });
  };

  return (
    <View style={CameraCarouselStyles.container}>
      <FlatList
        data={Shades}
        renderItem={({item}) => <CameraButton shade={item} onPress={takePic} />}
        horizontal
        // showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
      />
    </View>
  );
}

const CameraCarouselStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
