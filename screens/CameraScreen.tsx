// import React, {useEffect, useState, useRef} from 'react';
// import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
// import {dimensions, colors} from '../CSS';
// import {Camera, CameraType} from 'expo-camera';
// import {CameraButton} from '../components/CameraButton';
// import CameraCarousel from '../components/CameraCarousel';

// export function CameraPreview({navigation, image = null}) {
//   if (!image) {
//     navigation.goBack();
//   }

//   return (
//     <View style={CameraStyles.CameraContainer}>
//       <View style={CameraStyles.cameraContainer}>
//         {/* {image && <Image source={{ uri: "data:image/jpg;base64," + image.base64}}/>} */}
//         {image && (
//           <Image source={{uri: image.uri}} style={CameraStyles.camRatio} />
//         )}
//       </View>
//       <View style={CameraStyles.topBar}>
//         <View style={CameraStyles.topButtons}>
//           <Pressable
//             onPress={() => {
//               navigation.goBack();
//             }}>
//             <Image source={require('../assets/icons/close.png')} />
//           </Pressable>
//         </View>
//       </View>
//       <View style={CameraStyles.buttonContainer}>
//         <CameraCarousel navigation={navigation} token="" />
//       </View>
//     </View>
//   );
// }

// export function CameraContainer({navigation, screenType = null}) {
//   let cameraRef = useRef();
//   const [hasCameraPermission, sethasCameraPermission] = useState();
//   const [image, setImage] = useState();
//   const [type, setType] = useState(CameraType.front);

//   useEffect(() => {
//     (async () => {
//       const camPremission = await Camera.requestCameraPermissionsAsync();
//       sethasCameraPermission(camPremission.status === 'granted');
//       // if(!hasCameraPermission){
//       //   navigation.goBack();
//       // }
//     })();
//   }, []);

//   if (hasCameraPermission === undefined) {
//     return <Text>Requesting Permission</Text>;
//   } else if (!hasCameraPermission) {
//     return (
//       <Text>
//         Permission for camera not granted. Please change this in settings
//       </Text>
//     );
//   }

//   const takePic = async () => {
//     let options = {
//       quality: 1,
//       base64: true,
//       exif: false,
//     };
//     const data = await cameraRef.current.takePictureAsync(options);
//     setImage(data);
//   };

//   if (image) {
//     return <CameraPreview navigation={navigation} image={image} />;
//   }

//   return (
//     <View style={CameraStyles.CameraContainer}>
//       <View style={CameraStyles.cameraContainer}>
//         <Camera
//           style={CameraStyles.camRatio}
//           type={type}
//           ratio={'4:5'}
//           ref={cameraRef}
//         />
//       </View>
//       <View style={CameraStyles.topBar}>
//         <View style={CameraStyles.topButtons}>
//           <Pressable
//             onPress={() => {
//               navigation.goBack();
//             }}>
//             <Image source={require('../assets/icons/close.png')} />
//           </Pressable>
//           <Pressable
//             onPress={() => {
//               setType(
//                 type == CameraType.back ? CameraType.front : CameraType.back,
//               );
//             }}>
//             <Image
//               source={require('../assets/icons/rotateCamera.png')}
//               style={CameraStyles.rotateCamera}
//             />
//           </Pressable>
//         </View>
//       </View>
//       <View style={CameraStyles.buttonContainer}>
//         <CameraButton shade={{color: colors.goldLight}} onPress={takePic} />
//       </View>
//     </View>
//   );
// }

// export function CameraMenu({navigation}) {
//   return (
//     <View style={CameraStyles.menu}>
//       <Pressable
//         style={CameraStyles.menuButtons}
//         onPress={() => {
//           navigation.navigate('CameraContainer', {screenType: 'Recents'});
//         }}>
//         <Text style={{color: colors.goldLight}}>Recents</Text>
//       </Pressable>
//       <Pressable
//         style={CameraStyles.menuButtons}
//         onPress={() => {
//           navigation.navigate('CameraContainer', {screenType: 'Favourites'});
//         }}>
//         <Text style={{color: colors.goldLight}}>Favourites</Text>
//       </Pressable>
//       <Pressable
//         style={CameraStyles.menuButtons}
//         onPress={() => {
//           navigation.navigate('CameraContainer', {screenType: 'New Shades'});
//         }}>
//         <Text style={{color: colors.goldLight}}>New Shades</Text>
//       </Pressable>
//     </View>
//   );
// }

// export function CameraScreen({navigation}) {
//   return <CameraMenu navigation={navigation} />;
// }

// const CameraStyles = StyleSheet.create({
//   CameraContainer: {
//     flex: 1,
//   },
//   cameraContainer: {
//     flex: 1,
//   },
//   camRatio: {
//     flex: 1,
//     aspectRatio: 1,
//   },
//   menuButtons: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderColor: colors.goldLight,
//     borderWidth: 1,
//     margin: 30,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 50,
//   },
//   menu: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.black,
//     flex: 1,
//   },
//   topBar: {
//     position: 'absolute',
//     top: 20,
//     width: dimensions.fullWidth,
//   },
//   topButtons: {
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     margin: 20,
//     flexDirection: 'row',
//   },
//   rotateCamera: {
//     height: 30,
//     width: 30,
//     tintColor: colors.goldLight,
//   },
// });

import React from 'react';
import {View, Text} from 'react-native';

export function CameraPreview({navigation, image = null}) {
  if (!image) {
    navigation.goBack();
  }

  return (
    <View>
      <Text>Camera</Text>
    </View>
  );
}

export function CameraContainer({navigation, screenType = null}) {
  return (
    <View>
      <Text>Camera</Text>
    </View>
  );
}

export function CameraMenu({navigation}) {
  return (
    <View>
      <Text>Camera</Text>
    </View>
  );
}

export function CameraScreen({navigation}) {
  return <CameraMenu navigation={navigation} />;
}
