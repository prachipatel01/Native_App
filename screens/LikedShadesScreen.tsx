import React, { useContext, useEffect } from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {ShadeCard} from '../components/ShadeCard';
import {colors, dimensions, styles} from '../CSS';
import {GoldGradientText} from '../components/Gradient';
import { ShadesContext } from '../store/context/shades-context';

export const LikedShadesScreen = ({navigation}) => {
  const shadesContext = useContext(ShadesContext);
  
  useEffect(() => {
    shadesContext.getToken();
    if(shadesContext.token){
      shadesContext.getLikedShades(shadesContext.token);
    }
  }, [shadesContext.token]);

  return (
    <View style={{backgroundColor: colors.black}}>
      <SafeAreaView
        style={[
          styles.body,
          LikedShadesScreenStyle.container,
          {minHeight: dimensions.fullHeight - 130},
        ]}>
        {shadesContext.likedShades ? (
          <FlatList
            data={shadesContext.likedShades}
            numColumns={2}
            renderItem={({item, index}) => (
              <ShadeCard
                shade={item}
                key={index}
                navigation={navigation}
                token={shadesContext.token}
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

const LikedShadesScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    // height: dimensions.fullHeight - 150,
    alignItems: 'center',
  },
});
