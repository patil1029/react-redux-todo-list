import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { List, listContent, selectedList, tokenContentType } from '../types'
import authAxios from "../utils/authAxios";

interface stateType {
  listItems: List,
  selectedList: selectedList,
  listContent: listContent,
  selectedListContent: listContent[],
  accessToken: string,
  tokenContent: tokenContentType,
  error: string
}

const initialState: stateType = {
  listItems: [],
  selectedList: {} as selectedList,
  listContent: {} as listContent,
  selectedListContent: [],
  accessToken: '',
  tokenContent: {} as tokenContentType,
  error: ''
}

const parseJwt = (token: string): tokenContentType => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}
const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setAccessToken: (state: stateType, action: PayloadAction<string>) => {
      authAxios.defaults.headers['Authorization'] = `Bearer ${action.payload}`
      state.accessToken = action.payload
      state.tokenContent = parseJwt(action.payload)
    },
    setError: (state: stateType, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    setList: (state: stateType, action: PayloadAction<List>) => {
      state.listItems = action.payload
    },
    setListContent: (state: stateType, action: PayloadAction<listContent>) => {
      state.listContent = action.payload
    },
    logout: (state: stateType) => {
      return initialState
    }
  }

})

export const { setAccessToken, setError, setList, setListContent, logout } = todoListSlice.actions;
export default todoListSlice.reducer;