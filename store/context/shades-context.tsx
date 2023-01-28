import {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ShadesContext = createContext({
  recentShades: [],
  favouriteShades: [],
  likedShades: [],
  token: null,
  error: null,
  getToken: () => {},
  getRecentShades: (_token) => {},
  addRecentShades: (_token, shade) => {},
  getFavouriteShades: (_token) => {},
  addFavouriteShades: (_token, shade) => {},
  getLikedShades: (_token) => {},
  addLikedShade: (_token, shade) => {},
  removeLikedShade: (_token, shade) => {},
  addShadeToCart: (_token, shade) => {},
});

function ShadesContextProvider({children}) {
  const [token, setToken] = useState();
  const [recentShades, setRecentShades] = useState();
  const [favouriteShades, setFavouriteShades] = useState();
  const [likedShades, setLikedShades] = useState();
  const [error, setError] = useState();

  const getToken = async () => {
    await AsyncStorage.getItem('myEuphoriaToken').then(_token => {
      setToken(_token);
    });
  };

  const getRecentShades = async (_token) => {
    await fetch('http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/recents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: _token,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError('Error while fetching data, please signin again');
        } else {
          setRecentShades(data.recents);
        }
      });
  };

  const addRecents = async (_token, shade) => {
    await fetch('http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/recents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: _token,
      },
      body: JSON.stringify({shadeId: shade._id}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError('Error while fetching data, please signin again');
        }else {
          setRecentShades(data.recents);
        }
      });
  };

  const getFavourites = async (_token) => {
    await fetch(
      'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/favourites',
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
          setFavouriteShades(data.favourites);
        }
      });
  };
  const addFavourites = async (_token, shade) => {
    await fetch(
      'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/favourites',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: _token,
        },
        body: JSON.stringify({shadeId: shade._id}),
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError('Error while fetching data, please signin again');
        } else {
          setFavouriteShades(data.favourites);
        }
      });
  };
  const getLiked = async (_token) => {
    fetch(
      'http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/liked',
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
          setLikedShades(data.likedShades);
        }
      });
  };
  const addLiked = async (_token, shade) => {
    await fetch('http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/liked', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: _token,
      },
      body: JSON.stringify({shadeId: shade._id}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError('Error while fetching data, please signin again');
        }
      });
  };

  const removeLiked = async (_token, shade) => {
    await fetch('http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/liked', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: _token,
      },
      body: JSON.stringify({shadeId: shade._id}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError('Error while fetching data, please signin again');
        }
      });
  }

  const addShadeToCart = async (_token, shade) => {
    await fetch('http://ec2-52-91-34-18.compute-1.amazonaws.com/api/v1/shade/myCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: _token,
      },
      body: JSON.stringify({shade: shade.shadeName}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError('Error while fetching data, please signin again');
        } else {
          alert(`${shade.shadeName} is added to your cart`);
        }
      });
  }

  const value = {
    recentShades: recentShades,
    favouriteShades: favouriteShades,
    likedShades: likedShades,
    token: token,
    error: error,
    getToken: getToken,
    getRecentShades: getRecentShades,
    addRecentShades: addRecents,
    getFavouriteShades: getFavourites,
    addFavouriteShades: addFavourites,
    getLikedShades: getLiked,
    addLikedShade: addLiked,
    removeLikedShade: removeLiked,
    addShadeToCart: addShadeToCart,
  };

  return <ShadesContext.Provider value={value}>{children}</ShadesContext.Provider>;
}

export default ShadesContextProvider;
