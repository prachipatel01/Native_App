import {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TokenContext = createContext({
    token: null,
    getToken: () => {},
});

function TokenContextProvider({children}) {
    const [token, setToken] = useState();

    const getToken = async () => {
        console.log('getToken clicked')
        await AsyncStorage.getItem('myEuphoriaToken').then(_token => {
          setToken(_token);
          console.log(_token);
        });
    };

    const value = {
        token: token,
        getToken: getToken,
    };

    return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
}

export default TokenContextProvider;
