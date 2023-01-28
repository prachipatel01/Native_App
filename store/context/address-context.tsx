import {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddressContext = createContext({
    token: null,
    error: null,
    addresses: [],
    getToken: () => {},
    getAddresses: (_token) => {},
    changeDefaultAddress: (_token, AddressId) => {},
    addAddress: (_token) => {},
    editAddress: (_token) => {},
    removeAddress: (_token, AddressId) => {},
});

function AddressContextProvider({children}) {
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [addresses, setAddresses] = useState();

    const getToken = async () => {
        await AsyncStorage.getItem('myEuphoriaToken').then(_token => {
          setToken(_token);
        });
      };

    const getAddresses = async (_token) => {
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
                setAddresses(data.addresses);
              }
            });
    }

    const changeDefaultAddress = async (_token, AddressId) => {
        await fetch(
            'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/user/Address/changeDefault',
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: _token,
              },
              body: JSON.stringify({addressId: AddressId}),
            },
          )
            .then(res => res.json())
            .then(data => {
              if (data.error) {
                setError('Error while fetching data, please signin again');
              } else {
                setAddresses(data.addresses);
              }
            });
    }

    const addAddress = (_token) => {

    }

    const editAddress = (_token) => {

    }

    const removeAddress = async (_token, AddressId) => {
        await fetch(
            'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/user/Addresses',
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: _token,
              },
              body: JSON.stringify({addressId: AddressId}),
            },
          )
            .then(res => res.json())
            .then(data => {
              if (data.error) {
                setError('Error while fetching data, please signin again');
              } else {
                setAddresses(data.addresses);
              }
            });
    }

    const value = {
        token: token,
        error: error,
        addresses: addresses,
        getToken: getToken,
        getAddresses: getAddresses,
        changeDefaultAddress: changeDefaultAddress,
        addAddress: addAddress,
        editAddress: editAddress,
        removeAddress: removeAddress,
    }

    return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
}

export default AddressContextProvider;