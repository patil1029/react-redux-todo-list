import store from './store'; // Adjust the path as necessary
import type { loginPayload, signUpPayload } from '../types'
import { setAccessToken, setError } from './todoListSlice';
import axios from 'axios';
import { redirect } from 'react-router-dom';

export const register = (payload: signUpPayload) => {
  return async (dispatch: typeof store.dispatch) => {
    try {
      await axios.post('/auth/register', payload)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }

  }
}

export const login = (payload: loginPayload) => {
  return async (dispatch: typeof store.dispatch) => {
    await axios.post('/auth/login',
      payload,
      { withCredentials: true }).then((res) => {
        if (res.status === 201) {
          dispatch(setAccessToken(res.data.accessToken))
          redirect('/')
        }
      }
      ).catch((error) => {
        dispatch(setError(error.message))
      })
  }
}