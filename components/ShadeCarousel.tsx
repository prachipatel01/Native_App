import * as React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {styles, dimensions} from '../CSS';
import {carouselShadeImages} from '../assets/shades';
import {GoldGradient} from './Gradient';

export function CarouselCard({item, navigation}) {
  return (
    <Pressable
      style={styles.carouselCard}
      onPress={() => {
        navigation.navigate('CreateShadeScreen', {
          shade: item,
          token: '',
        });
      }}>
      <Image
        source={carouselShadeImages[item.modelImage]}
        style={styles.carouselImage}
      />
      <View style={styles.carouselShade}>
        <View
          style={{
            ...styles.carouselShadeRound,
            backgroundColor: item.colorCode,
          }}></View>
        <Text style={styles.InterWhite}>{item.shadeName}</Text>
      </View>
    </Pressable>
  );
}

const button = () => {
  return <View></View>;
};

export function ScrollButton({shades}) {
  const len = shades.length / 3;
  var buttons = [];
  for (var i = 0; i < len; i++) {
    buttons.push(
      <GoldGradient
        component={button}
        style={styles.carouselButton}
        key={i}></GoldGradient>,
    );
  }
  return <View style={styles.carouselButtonList}>{buttons}</View>;
}

// const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_WIDTH = dimensions.fullWidth;
const COUNT = 3;

export function ShadeCarousel({navigation, token}) {
  const [isVertical, setIsVertical] = React.useState(false);
  const [isFast, setIsFast] = React.useState(false);
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);
  const [carouselShades, setCarouselShades] = React.useState();

  React.useEffect(() => {
    fetch('http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/shade/shadesWithModel', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
          navigation.navigate('SignIn');
        } else {
          setCarouselShades(data.shades);
        }
      });
  }, []);

  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: PAGE_WIDTH,
        height: styles.carouselCard.height,
        style: {
          height: PAGE_WIDTH / 2,
        },
      } as const)
    : ({
        vertical: false,
        width: (PAGE_WIDTH - 10) / COUNT,
        // height: PAGE_WIDTH / 2,
        height: styles.carouselCard.height,
        style: {
          width: PAGE_WIDTH,
        },
      } as const);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
      }}>
      {carouselShades && (
        <Carousel
          {...baseOptions}
          loop
          autoPlay={isAutoPlay}
          autoPlayInterval={isFast ? 100 : 2000}
          data={carouselShades}
          // onSnapToItem={index => console.log('current index:', index)}
          renderItem={({index}) => (
            <CarouselCard
              item={carouselShades[index]}
              navigation={navigation}
            />
          )}
        />
      )}
      {carouselShades && <ScrollButton shades={carouselShades} />}
    </View>
  );
}
