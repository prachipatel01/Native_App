import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import {TextInput, View, ScrollView, SafeAreaView, Text} from 'react-native';
import {colors, styles} from '../CSS';
import {GoldGradientText} from './Gradient';
import {Checkbox, RadioButton} from 'react-native-paper';
import {BottomFormButtonTab} from './BottomButtonTab';

export function AddressForm({route, navigation}) {
  const {token, formData, fun, id} = route.params;
  const [fdata, setFdata] = useState(formData);
  const [errormsg, setErrormsg] = useState(null);
  const [isDefault, setIsDefault] = useState(fdata.isDefault);
  const [type, setType] = useState(fdata.type);

  const saveAddress = () => {
    if (fun == 'save') {
      fetch(
        'http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/user/Addresses',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(fdata),
        },
      )
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setErrormsg(data.error);
            return;
          } else {
            alert('Address added Successfully!');
            navigation.goBack();
          }
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          // ADD THIS THROW error
          throw error;
        });
    } else if (fun == 'edit') {
      fetch(
        'http://ec2-3-87-206-233.compute-1.amazonaws.com:3000/api/v1/user/Addresses',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({fdata, addressId: id}),
        },
      )
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setErrormsg(data.error);
            return;
          } else {
            alert('Address added Successfully!');
            navigation.goBack();
          }
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          // ADD THIS THROW error
          throw error;
        });
    }
  };

  return (
    <SafeAreaView
      style={[styles.body, {justifyContent: 'center', alignItems: 'center'}]}>
      <ScrollView>
        <GoldGradientText style={styles.CinzelGold}>
          ADD NEW ADDRESS
        </GoldGradientText>
        <LinearGradient
          colors={[colors.grey, colors.darkGrey]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.form}>
          <View>
            <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
              Name *
            </GoldGradientText>
            <TextInput
              style={styles.input}
              placeholder="Enter your Name"
              defaultValue={fdata.name}
              onPressIn={() => {
                setErrormsg(null);
              }}
              onChangeText={text =>
                setFdata({...fdata, name: text})
              }></TextInput>
          </View>
          <View>
            <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
              Mobile
            </GoldGradientText>
            <TextInput
              style={styles.input}
              placeholder="Enter your Mobile"
              defaultValue={fdata.mobile}
              onPressIn={() => {
                setErrormsg(null);
              }}
              onChangeText={text =>
                setFdata({...fdata, mobile: text})
              }></TextInput>
          </View>
          <View>
            <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
              Address
            </GoldGradientText>
            <TextInput
              style={styles.input}
              placeholder="Enter your Address"
              defaultValue={fdata.address}
              onPressIn={() => {
                setErrormsg(null);
              }}
              onChangeText={text =>
                setFdata({...fdata, address: text})
              }></TextInput>
          </View>
          <View>
            <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
              Locality
            </GoldGradientText>
            <TextInput
              style={styles.input}
              placeholder="Enter your Locality"
              defaultValue={fdata.locality}
              onPressIn={() => {
                setErrormsg(null);
              }}
              onChangeText={text =>
                setFdata({...fdata, locality: text})
              }></TextInput>
          </View>
          <View>
            <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
              City
            </GoldGradientText>
            <TextInput
              style={styles.input}
              placeholder="Enter your City"
              onPressIn={() => {
                setErrormsg(null);
              }}
              onChangeText={text =>
                setFdata({...fdata, city: text})
              }></TextInput>
          </View>
          <View>
            <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
              State
            </GoldGradientText>
            <TextInput
              style={styles.input}
              placeholder="Enter your State"
              defaultValue={fdata.state}
              onPressIn={() => {
                setErrormsg(null);
              }}
              onChangeText={text =>
                setFdata({...fdata, state: text})
              }></TextInput>
          </View>
          <View>
            <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
              Pincode
            </GoldGradientText>
            <TextInput
              style={styles.input}
              placeholder="Enter your Pincode"
              defaultValue={fdata.pinCode}
              onPressIn={() => {
                setErrormsg(null);
              }}
              onChangeText={text =>
                setFdata({...fdata, pinCode: text})
              }></TextInput>
          </View>
          <View style={styles.rowFlexStart}>
            <Checkbox
              color={colors.goldLight}
              status={fdata.isDefault ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsDefault(!isDefault);
                setFdata({...fdata, isDefault: isDefault});
              }}
            />
            <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
              Is Default
            </GoldGradientText>
          </View>
          <View>
            <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
              Type
            </GoldGradientText>
            <View style={styles.rowFlexStart}>
              <RadioButton
                value="Home"
                status={type === 'Home' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setType('Home');
                  setFdata({...fdata, type: 'Home'});
                }}
                color={colors.goldLight}
              />
              <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
                Home
              </GoldGradientText>
            </View>
            <View style={styles.rowFlexStart}>
              <RadioButton
                value="Office"
                status={type === 'Office' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setType('Office');
                  setFdata({...fdata, type: 'Office'});
                }}
                color={colors.goldLight}
              />
              <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
                Office
              </GoldGradientText>
            </View>
            <View style={styles.rowFlexStart}>
              <RadioButton
                value="Others"
                status={type === 'Others' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setType('Others');
                  setFdata({...fdata, type: 'Others'});
                }}
                color={colors.goldLight}
              />
              <GoldGradientText style={[styles.CinzelGold, styles.textInput]}>
                Others
              </GoldGradientText>
            </View>
            <View>
              {errormsg ? (
                <Text style={{...styles.InterWhite, paddingTop: 5}}>
                  {errormsg}
                </Text>
              ) : null}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
      <BottomFormButtonTab
        navigation={navigation}
        button1="CANCEL"
        onPress1={() => {
          navigation.goBack();
        }}
        button2="SAVE"
        onPress2={saveAddress}
      />
    </SafeAreaView>
  );
}
