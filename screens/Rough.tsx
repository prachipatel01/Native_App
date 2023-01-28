import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';
import { GoldGradientText } from '../components/Gradient';
import { dimensions, styles } from '../CSS';

export const CameraScreenMain = () => {
  const [isPermitted, setIsPermitted] = useState(false);
  const [captureImages, setCaptureImages] = useState([]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
        {
          title: 'Camera Permissions',
          message: 'App needs camera permissions',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.warn(error);
      return false;
    }
  };

  const requestExternalWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permissions',
          message: 'App needs External Storage Write permissions',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.warn(error);
      return false;
    }
  };

  const requestExternalReadPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'External Storage Read Permissions',
          message: 'App needs External Storage Read permissions',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.warn(error);
      return false;
    }
  };

  const openCamera = async () => {
    if (Platform.OS === 'android') {
      if (await requestCameraPermission()) {
        if (await requestExternalWritePermission()) {
          if (await requestExternalReadPermission()) {
            setIsPermitted(true);
          } else {
            console.warn('Read Access Permission denied');
            return;
          }
        } else {
          console.warn('Write Access Permission denied');
          return;
        }
      } else {
        console.warn('Camera Access Permission denied');
        return;
      }
    } else {
      setIsPermitted(true);
    }
  };

  const onBottomButtonPresses = event => {
    const images = JSON.stringify(event.captureImages);
    if (event.type === 'left') {
      setIsPermitted(false);
    } else if (event.type === 'right') {
      setIsPermitted(false);
      setCaptureImages(images);
    } else {
      Alert.alert(
        event.type,
        images,
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <SafeAreaView>
      {isPermitted ? (
        <View>
          <CameraScreen
            actions={{
              rightButtonText: 'Done',
              leftButtonText: 'Cancel',
            }}
            onBottomButtonPressed={event => onBottomButtonPresses(event)}
            // flashImages={{
            //   on: require(''),
            //   off: require(''),
            //   auto: require(''),
            // }}
            // captureFlipImage={require('')}
            // captureButtonImage={require('')}
            hideControl={false}
            showCapturedImageCount={false}
          />
        </View>
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
};

export const FunctionalityInProgress = ({navigation}) => {
  return (
    <View style={[styles.body, {height: dimensions.fullHeight - 100, justifyContent: 'center', alignItems: 'center'}]}>
      <GoldGradientText textStyle={styles.CinzelGold}>
        This Functionality is in progress!
      </GoldGradientText>
    </View>
  )
}