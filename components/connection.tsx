import React from 'react';
import type {RootState} from '../redux/store';
import {useSelector, useDispatch} from 'react-redux';
import {
  connectToDevice,
  getParameters,
  getRotations,
  sendRotations,
  disconnectToDevice,
} from '../redux/reducers/connectionReducer';
import {Button, Text, View} from 'react-native';
// import {Device} from 'react-native-ble-plx';

export function Connection() {
  const connectedDevice = useSelector(
    (state: RootState) => state.connection.connectedDevice,
  );
  const isConnected = useSelector(
    (state: RootState) => state.connection.isConnected,
  );
  const dispatch = useDispatch();

  return (
    <View>
      <Button
        onPress={() => dispatch(connectToDevice())}
        title="connectToDevice"
      />
      <Text>
        {connectedDevice ? connectedDevice.localName : 'Not Connected'}
      </Text>
      <Text>{isConnected ? 1 : 0}</Text>
      <Button onPress={() => dispatch(getParameters())} title="getParameters" />
      <Button onPress={() => dispatch(getRotations())} title="getRotations" />
      <Button onPress={() => dispatch(sendRotations())} title="sendRotations" />
      <Button
        onPress={() => dispatch(connectToDevice())}
        title="connectToDevice"
      />
      <Button
        onPress={() => dispatch(disconnectToDevice())}
        title="disconnectToDevice"
      />
    </View>
  );
}
