import {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RecentsContext = createContext({
  recentShades: [],
  token: null,
  getToken: () => {},
  getRecentShades: () => {},
  addRecentShades: (token, shade) => {},
});

const _getToken = () => {
  AsyncStorage.getItem('myEuphoriaToken').then(_token => {
    return _token;
  });
};

const getRecents = token => {
  fetch('http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/recents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert('Error while fetching data, please signin again');
      } else {
        return data.recents;
      }
    });
};

function RecentsContextProvider({children}) {
  const [token, setToken] = useState();
  const [recentShades, setRecentShades] = useState();

  const getToken = () => {
    AsyncStorage.getItem('myEuphoriaToken').then(_token => {
      setToken(_token);
    });
  };

  const getRecentShades = () => {
    fetch('http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/recents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
        } else {
          setRecentShades(data.recents);
        }
      });
  };

  const addRecents = (token, shade) => {
    fetch('http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/recents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({shadeId: shade._id}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error while fetching data, please signin again');
        }
      });
  };

  const value = {
    recentShades: recentShades,
    token: token,
    getToken: getToken,
    getRecentShades: getRecentShades,
    addRecentShades: addRecents,
  };

  return (
    <RecentsContext.Provider value={value}>{children}</RecentsContext.Provider>
  );
}

export default RecentsContextProvider;
