import {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OrdersContext = createContext({
    token: null,
    error: null,
    shadeCart: [],
    cartridgeCart: [],
    calculateTotal: [],
    defaultAddress: null,
    totalItemInCart: false,
    addresses: [],
    getToken: () => {},
    getMyCart: (_token) => {},
    getOrders: () => {},
    getAddress: (_token) => {},
    removeShadeFromCart: (_token, shadeId) => {},
    removeCartridgeFromCart: (_token, cartridgeId) => {},
})

function OrderContextProvider({children}) {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const [shadeCart, setShadeCart] = useState([]);
    const [cartridgeCart, setCartridgeCart] = useState([]);
    const [calculateTotal, setCalculateTotal] = useState({
        totalMrp: 0,
        totalDiscount: 0,
        total: 0,
        shippingCharge: 0,
    });
    const [defaultAddress, setDefaultAddress] = useState({});
    const [addresses, setAddresses] = useState([]);
    const [totalItemInCart, setTotalItemInCart] = useState(false);

    const getToken = async () => {
        await AsyncStorage.getItem('myEuphoriaToken').then(_token => {
          setToken(_token);
        });
    };
    
    const getMyCart = async (_token) => {
        await fetch(
            'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/user/myCart',
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
                setShadeCart(data.shades);
                setCartridgeCart(data.cartridges);
                setCalculateTotal({
                    totalMrp: data.mrp,
                    totalDiscount: data.discount,
                    total: data.total,
                    shippingCharge: data.shippingCharge,
                });
                if(shadeCart.length && cartridgeCart.length) {
                    setTotalItemInCart(true);
                }
            }
        })
    }

    const getOrders = () => {

    }

    const getAddress = async (_token) => {
        await fetch(
            'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/user/Addresses',
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
                data.addresses.map((item, index) => {
                    if (item.isDefault) {
                    setDefaultAddress(item);
                    }
                });
                setAddresses(data.addresses);
                if(shadeCart.length && cartridgeCart.length) {
                    setTotalItemInCart(true);
                }
                console.log(defaultAddress);
            }
        })
    }

    const removeShadeFromCart = async (_token, shadeId) => {
        await fetch(
          'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/myCart',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: _token,
            },
            body: JSON.stringify({shadeId: shadeId}),
          },
        )
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              setError('Error while fetching data, please signin again');
            }else{
                getMyCart(_token);
                if(shadeCart.length && cartridgeCart.length) {
                    setTotalItemInCart(true);
                }
            }
          })
      }

    const removeCartridgeFromCart = async (_token, cartridgeId) => {
        await fetch(
            'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/cartridge/myCart',
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: _token,
              },
              body: JSON.stringify({cartridgeId: cartridgeId}),
            },
        )
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.error) {
                setError('Error while fetching data, please signin again');
            }else{
                getMyCart(_token);
                if(shadeCart.length && cartridgeCart.length) {
                    setTotalItemInCart(true);
                }
            }
        })
    };

    const value = {
        token: token,
        error: error,
        shadeCart: shadeCart,
        cartridgeCart: cartridgeCart,
        calculateTotal: calculateTotal,
        totalItemInCart: totalItemInCart,
        getToken: getToken,
        getMyCart: getMyCart,
        getOrders: getOrders,
        getAddress: getAddress,
        removeShadeFromCart: removeShadeFromCart,
        removeCartridgeFromCart: removeCartridgeFromCart,
    }

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

export default OrderContextProvider;
