import {createContext, useState} from 'react';

export const DeviceContext = createContext({
  isConnected: false,
  battery: null,
  C1: false,
  C2: false,
  C3: false,
  C4: false,
  C5: false,

  connectWithDevice: () => {},
  getBattryStatus: () => {},
  getCartridgeStatus: () => {},
  sendMotorRotations: () => {},
});

function DeviceContextProvider({children}) {
  const [isConnected, setIsConnected] = useState();
  const [battery, setBattery] = useState();
  const [C1, setCartrage1] = useState();
  const [C2, setCartrage2] = useState();
  const [C3, setCartrage3] = useState();
  const [C4, setCartrage4] = useState();
  const [C5, setCartrage5] = useState();

  const connectWithDevice = () => {
    setIsConnected(true);
    getBattryStatus();
    getCartridgeStatus();
  };
  const getBattryStatus = () => {
    setBattery(50);
  };
  const getCartridgeStatus = () => {
    setCartrage1(true);
    setCartrage2(true);
    setCartrage3(true);
    setCartrage4(true);
    setCartrage5(true);
  };
  const sendMotorRotations = () => {
    alert('Motor Rotations sent!');
  };

  const value = {
    isConnected: isConnected,
    battery: battery,
    C1: C1,
    C2: C2,
    C3: C3,
    C4: C4,
    C5: C5,

    connectWithDevice: connectWithDevice,
    getBattryStatus: getBattryStatus,
    getCartridgeStatus: getCartridgeStatus,
    sendMotorRotations: sendMotorRotations,
  };

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}

export default DeviceContextProvider;
