import {Dimensions, StyleSheet} from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = {
  black: '#08080A',
  grey: '#353535',
  darkGrey: '#222222',
  goldDark: '#987952',
  goldLight: '#EEDABC',
  white: '#FFFFFF',
  whiteDark: '#CECECE',
  yellowGold: '#FAD05C',
};

export const styles = StyleSheet.create({
  HeaderText: {
    fontFamily: 'Cinzel-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 26,
    lineHeight: 35,
    letterSpacing: 1,
  },
  RobotolGold: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
  },
  CinzelGold: {
    fontFamily: 'Cinzel-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 27,
    letterSpacing: 1.5,
  },
  CinzelGoldBold: {
    fontFamily: 'Cinzel-Bold',
    // fontWeight: "700",
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 27,
    letterSpacing: 1.5,
  },
  CinzelBlack: {
    fontFamily: 'Cinzel-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1,
  },
  CinzelWhite: {
    fontFamily: 'CinzelDecorative-Bold',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 1,
    color: colors.white,
  },
  ReadexGold: {
    fontFamily: 'ReadexPro-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 27,
    letterSpacing: 1.5,
  },
  ReadexBlack: {
    fontFamily: 'ReadexPro-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1,
    color: colors.black,
  },
  ReadexWhite: {
    fontFamily: 'ReadexPro-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 26,
    color: colors.white,
  },
  ReadexWhiteSmall: {
    fontFamily: 'ReadexPro-Regular',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 10,
    lineHeight: 12,
    color: colors.white,
  },
  InriaYellowGold: {
    fontFamily: 'InriaSerif-Regular',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 24,
    color: colors.yellowGold,
  },
  InriaGold: {
    fontFamily: 'InriaSerif-Regular',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 17,
  },
  InterYellowGold: {
    fontFamily: 'Inter-Regular',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 17,
    color: colors.yellowGold,
  },
  InterGold: {
    fontFamily: 'Inter-Regular',
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 15,
  },
  InterWhite: {
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 10,
    lineHeight: 12,
    color: colors.white,
  },
  InterBlack: {
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 10,
    lineHeight: 12,
    color: colors.black,
  },

  cartridgeWheelInner: {
    height: 42,
    width: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartridgeWheelOuter: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  cartridgeDeviceInnerWheel: {
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartridgeDeviceOuterWheel: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: colors.goldLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartridgesWheel_0: {
    position: 'absolute',
    top: 95,
    left: 95,
    // margin: 5,
    transform: [
      {rotate: '-0deg'},
      {translateX: 50},
      {translateY: 50},
      {rotate: '0deg'},
    ],
  },
  cartridgesWheel_1: {
    top: 95,
    left: 95,
    // margin: 5,
    position: 'absolute',
    transform: [
      {rotate: '-70deg'},
      {translateX: 50},
      {translateY: 50},
      {rotate: '70deg'},
    ],
  },
  cartridgesWheel_2: {
    top: 95,
    left: 95,
    // margin: 5,
    position: 'absolute',
    transform: [
      {rotate: '-140deg'},
      {translateX: 50},
      {translateY: 50},
      {rotate: '140deg'},
    ],
  },
  cartridgesWheel_3: {
    top: 95,
    left: 95,
    // margin: 5,
    position: 'absolute',
    transform: [
      {rotate: '-210deg'},
      {translateX: 50},
      {translateY: 50},
      {rotate: '210deg'},
    ],
  },
  cartridgesWheel_4: {
    top: 95,
    left: 95,
    // margin: 5,
    position: 'absolute',
    transform: [
      {rotate: '-280deg'},
      {translateX: 50},
      {translateY: 50},
      {rotate: '280deg'},
    ],
  },
  OuterCartridgeCircle: {
    position: 'relative',
    borderColor: colors.goldLight,
    borderWidth: 5,
    width: 250,
    height: 250,
    borderRadius: 150,
    backgroundColor: colors.black,
  },
  goldButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  goldButtonText: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  blackButton: {
    width: 200,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 2,
  },
  tryItOnButton: {
    width: dimensions.fullWidth - 25,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#0A0500',
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  bottomTab: {
    height: 75,
    tabBarInactiveTintColor: colors.goldLight,
    tabBarActiveTintColor: colors.black,
    tabBarActiveBackgroundColor: colors.black,
    tabBarInactiveBackgroundColor: colors.black,
  },
  topTab: {
    height: 75,
    tabBarInactiveTintColor: colors.white,
    tabBarActiveTintColor: colors.goldLight,
    tabBarActiveBackgroundColor: colors.goldLight,
    tabBarInactiveBackgroundColor: colors.goldLight,
  },
  none: {
    flex: 1,
  },

  cameraButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.goldLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: colors.black,
  },
  bottomTabIcons: {
    tintColor: colors.goldLight,
  },
  slide: {},
  carouselCard: {
    width: 127,
    height: 152,
    position: 'absolute',
    // backgroundColor: colors.grey,
  },
  carouselShade: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  carouselShadeRound: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderColor: colors.white,
    borderWidth: 1,
    margin: 5,
  },
  carouselImage: {
    width: 127,
    height: 152,
  },
  carouselButton: {
    height: 16,
    width: 16,
    borderRadius: 8,
    margin: 5,
  },
  carouselButtonList: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  shadeUniverse: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  shadeUniverseShades: {
    width: dimensions.fullWidth - 40,
    height: 92,
    position: 'absolute',
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    margin: 10,
  },
  shadeUniverseImage: {
    width: dimensions.fullWidth - 40,
    height: 92,
    margin: 10,
  },
  shadeUniverseImageGradient: {
    width: dimensions.fullWidth - 40,
    height: 92,
    // marginTop: 10,
  },
  shadeUniverseImageStyle: {
    width: dimensions.fullWidth - 40,
    height: 92,
    borderRadius: 12,
    opacity: 0.5,
  },
  shadeUniverseText: {},
  homeHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 30,
    // width: dimensions.fullWidth,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    // paddingTop: 30,
    // width: dimensions.fullWidth,
    backgroundColor: colors.black,
    alignItems: 'center',
    padding: 10,
  },
  homePageHeaderElements: {
    padding: 20,
  },
  headerElements: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  topTabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.black,
    padding: 5,
  },
  topTabHeaderElements: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    height: 0.5,
    width: dimensions.fullWidth,
  },
  CommercialContainer: {
    width: dimensions.fullWidth,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldIcon: {
    tintColor: colors.goldLight,
    // color: colors.goldLight,
  },
  enabledIcon: {
    tintColor: colors.goldLight,
    margin: 5,
  },
  disabledIcon: {
    tintColor: colors.grey,
    margin: 5,
  },
  scrollIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountsButton: {},
  span: {},
  container: {},
  body: {
    backgroundColor: colors.black,
  },
  button: {},
  buttonText: {},
  originalPrice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  goldButtonDefault: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    // backgroundColor: colors.black,
    // borderColor: colors.goldLight,
    // borderRadius: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.goldLight,
    width: dimensions.fullWidth - 70,
    color: colors.goldLight,
  },
  textInput: {
    fontSize: 15,
  },
  inputSubmit: {
    backgroundColor: colors.goldLight,
    borderRadius: 20,
    padding: 10,
    width: dimensions.fullWidth - 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  onClickCamera: {
    width: 50,
    height: 50,
    borderColor: colors.goldLight,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: 'pink',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    margin: 5,
  },
  createdShade: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.yellowGold,
    margin: 20,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowFlexStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowSpaceArround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rowSpaceEvenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  type: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    borderColor: colors.goldLight,
    borderWidth: 1,
    color: colors.goldLight,
  },
  form: {
    width: dimensions.fullWidth - 30,
    padding: 20,
    paddingBottom: 100,
  },
  alignJustify: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

export const margin = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};
