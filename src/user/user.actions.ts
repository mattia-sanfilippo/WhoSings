import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_USER, LOGOUT_USER} from './user.constants';

export const logInUser = (user: string, navigation: any, next: string) => {
  return function (dispatch: any) {
    try {
      return AsyncStorage.setItem('user', user, () => {
        dispatch(setUser(user));
        navigation.navigate(next, {nickname: user});
      });
    } catch (error) {
      dispatch(setUser('', error));
    }
  };
};

export const logOutUser = () => {
  return function (dispatch: any) {
    try {
      return AsyncStorage.setItem('user', '', () =>
        dispatch(setLogOutUser(true)),
      );
    } catch (error) {
      dispatch(setLogOutUser(false, error));
    }
  };
};

export const getUser = () => {
  return function (dispatch: any) {
    return AsyncStorage.getItem('user')
      .then((result) => {
        result !== null ? dispatch(setUser(result)) : dispatch(setUser(''));
      })
      .catch((error) => {
        dispatch(setUser('', error));
      });
  };
};

const setUser = (user: string, error?: Error) => {
  return {
    type: GET_USER,
    payload: user,
    failure: error,
  };
};

const setLogOutUser = (loggedOut: boolean, error?: Error) => {
  return {
    type: LOGOUT_USER,
    payload: loggedOut,
    failure: error,
  };
};
