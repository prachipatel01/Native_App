import React, {useState} from 'react';
import {StyleSheet, View, Image, Pressable} from 'react-native';
import {colors, dimensions, styles} from '../CSS';
import {GoldGradientText, GoldButton} from './Gradient';

function Price({shade}) {
  if (shade.isFree) {
    return (
      <View style={ShadeCardStyle.inRow}>
        <GoldGradientText
          style={{
            ...styles.CinzelGold,
            ...styles.originalPrice,
            ...ShadeCardStyle.text,
          }}>
          {shade.price}
        </GoldGradientText>
        <GoldGradientText
          style={{...styles.CinzelGold, ...ShadeCardStyle.text}}>
          Free
        </GoldGradientText>
      </View>
    );
  } else {
    if (shade.discountedPrice == shade.price) {
      return (
        <GoldGradientText
          style={{...styles.CinzelGold, ...ShadeCardStyle.text}}>
          {shade.price}
        </GoldGradientText>
      );
    } else {
      return (
        <View style={ShadeCardStyle.inRow}>
          <GoldGradientText
            style={{
              ...styles.CinzelGold,
              ...styles.originalPrice,
              ...ShadeCardStyle.text,
            }}>
            {shade.price}
          </GoldGradientText>
          <GoldGradientText
            style={{...styles.CinzelGold, ...ShadeCardStyle.text}}>
            {shade.discountedPrice}
          </GoldGradientText>
        </View>
      );
    }
  }
}

export function Ratings({ratings, style}) {
  const stars = [...Array(ratings)];
  const emptyStars = [...Array(5 - ratings)];
  return (
    <View style={styles.rowFlexStart}>
      {stars.map((item, index) => {
        return (
          <Image
            source={require('../assets/icons/star.png')}
            key={index}
            style={style}
          />
        );
      })}
      {emptyStars.map((item, index) => {
        return (
          <Image
            source={require('../assets/icons/disabledStar.png')}
            key={index}
            style={style}
          />
        );
      })}
    </View>
  );
}

export function ShadeCard({navigation, shade, token, isLiked = false}) {
  const backgroundColor = {
    backgroundColor: shade.colorCode,
  };
  const [liked, setLiked] = useState(isLiked);

  const addToCart = shadeName => {
    fetch('http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/shade/myCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({shade: shadeName}),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          alert('Error while fetching data, please signin again');
          navigation.navigate('SignIn');
        } else {
          alert(`${shadeName} is added to your cart`);
        }
      });
  };

  const likeShade = shadeId => {
    fetch('http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/shade/liked', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({shadeId: shadeId}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
          navigation.navigate('SignIn');
        } else {
          setLiked(true);
        }
      });
  };

  const dislikeShade = shadeId => {
    fetch('http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/shade/liked', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({shadeId: shadeId}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
          navigation.navigate('SignIn');
        } else {
          setLiked(false);
        }
      });
  };

  return (
    <View style={ShadeCardStyle.card}>
      <View style={{...ShadeCardStyle.shade, ...backgroundColor}}></View>
      <View style={ShadeCardStyle.description}>
        <View style={ShadeCardStyle.halfTheContainer}>
          <GoldGradientText
            style={{...styles.CinzelGold, ...ShadeCardStyle.text}}>
            {shade.shadeName}
          </GoldGradientText>
          <Price shade={shade} />
        </View>
        <View>
          <Ratings ratings={shade.ratings} style={ShadeCardStyle.stars} />
        </View>
      </View>
      <View style={ShadeCardStyle.buttons}>
        {liked ? (
          <Pressable
            onPress={() => {
              dislikeShade(shade._id);
            }}>
            <Image
              source={require('../assets/icons/heart.png')}
              style={[styles.goldIcon, styles.headerIcon]}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              likeShade(shade._id);
            }}>
            <Image source={require('../assets/icons/disabledLike.png')} />
          </Pressable>
        )}
        {shade.price == shade.discountedPrice ? (
          <GoldButton
            text="CREATE SHADE"
            textStyle={ShadeCardStyle.textStyle}
            buttonStyle={ShadeCardStyle.buttonStyle}
            onPress={() => {
              navigation.navigate('CreateShadeScreen', {
                shade: shade,
                token: token,
              });
            }}
          />
        ) : (
          <GoldButton
            text="ADD TO CART"
            textStyle={ShadeCardStyle.textStyle}
            buttonStyle={ShadeCardStyle.buttonStyle}
            onPress={() => {
              // navigation.navigate('MyCartScreen')
              addToCart(shade.shadeName);
            }}
          />
        )}
      </View>
    </View>
  );
}

const ShadeCardStyle = StyleSheet.create({
  card: {
    // width: 166,
    // height: 188,
    width: dimensions.fullWidth / 2 - 40,
    // minHeight: (dimensions.fullWidth / 2) - 20,
    // height: (dimensions.fullWidth / 2) - 10,
    borderColor: colors.goldLight,
    borderWidth: 1,
    alignItems: 'center',
    margin: 10,
  },
  shade: {
    // width: 145,
    // height: 100,
    width: dimensions.fullWidth / 2 - 60,
    height: dimensions.fullWidth / 2 - 100,
    marginTop: 10,
  },
  text: {
    fontSize: 11,
    lineHeight: 13,
  },
  description: {
    marginBottom: 5,
    marginTop: 5,
    width: dimensions.fullWidth / 2 - 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inRow: {
    flexDirection: 'row',
  },
  stars: {
    width: 5,
    height: 5,
    margin: 4,
  },
  disabledStars: {
    tintColor: colors.black,
    borderColor: colors.goldLight,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: dimensions.fullWidth / 2 - 60,
  },
  buttonStyle: {
    width: dimensions.fullWidth / 2 - 100,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  textStyle: {
    ...styles.CinzelBlack,
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 0.5,
  },
  halfTheContainer: {
    width: (dimensions.fullWidth / 2 - 40) / 2,
  },
});
