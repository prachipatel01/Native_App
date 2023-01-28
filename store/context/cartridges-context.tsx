import {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartridgesContext = createContext({
    token: null,
    error: null,
    cartridges: [],
    getToken : () => {},
    getCartridges: (_token) => {},
    addCartridgeToCart: (_token, cartridge) => {},
})

function CartridgeContextProvider({children}) {
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [cartridges, setCartridges] = useState([]);

    const getToken = async () => {
        await AsyncStorage.getItem('myEuphoriaToken').then(_token => {
          setToken(_token);
        });
    };

    const getCartridges = async (_token) => {
        await fetch(
            'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/cartridge',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: _token,
              },
            },
        )
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError('Error while fetching data, please signin again');
            } else {
                setCartridges(data.cartridges);
            }
        });
    };

    const addCartridgeToCart = async (_token, cartridge) => {
        await fetch(
            'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/cartridge/myCart',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: _token,
              },
              body: JSON.stringify({cartridge: cartridge.cartridgeShadeName}),
            },
        )
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError('Error while fetching data, please signin again');
            } else {
                alert(`${cartridge.cartridgeShadeName} is added to your cart`);
            }
        });
    };

    const value = {
        token: token,
        error: error,
        cartridges: cartridges,
        getToken : getToken,
        getCartridges: getCartridges,
        addCartridgeToCart: addCartridgeToCart,
    }

    return <CartridgesContext.Provider value={value}>{children}</CartridgesContext.Provider>
}

export default CartridgeContextProvider;