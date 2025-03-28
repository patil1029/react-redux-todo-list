import { createListItem, createListPayload } from "../types";
import authAxios from "../utils/authAxios";
import store from './store';
import { setError, setList, setListContent } from "./todoListSlice";

export const getList = () => {
  return async (dispatch: typeof store.dispatch) => {
    await authAxios.get('List').then(res => {
      if (res.status === 200) {
        dispatch(setList(res.data))
      }
    }).catch(error => {
      dispatch(setError(error))
    })

  }
}

export const getListContent = (id: number) => {
  return async (dispatch: typeof store.dispatch) => {
    await authAxios.get(`List/${id}`).then(res => {
      if (res.status === 200) {
        dispatch(setListContent(res.data))
      }
    }).catch(error => {
      dispatch(setError(error))
    })

  }
}

export const createNewList = (payload: createListPayload) => {
  return async (dispatch: typeof store.dispatch) => {
    await authAxios.post(`List`, payload).then(res => {
      if (res.status === 201) {
        dispatch(getList())
      }
    }).catch(error => {
      dispatch(setError(error))
    })

  }
}

export const createNewListItem = (id: number, payload: createListItem) => {
  return async (dispatch: typeof store.dispatch) => {
    await authAxios.post(`List/${id}/list-item`, payload).then(res => {
      if (res.status === 201) {
        dispatch(setListContent(res.data))
      }
    }).catch(error => {
      dispatch(setError(error))
    })

  }
}

export const deleteList = (id: number) => {
  return async (dispatch: typeof store.dispatch) => {
    await authAxios.delete(`List/${id}`).then(res => {
      if (res.status === 200) {
        dispatch(getList())
      }
    }).catch(error => {
      dispatch(setError(error))
    })

  }
}

export const deleteListItem = (id: number, itemID: number) => {
  return async (dispatch: typeof store.dispatch) => {
    await authAxios.delete(`List/${id}/list-item/${itemID}`).then(res => {
      if (res.status === 200) {
        dispatch(getList())
        dispatch(getListContent(id))
      }
    }).catch(error => {
      dispatch(setError(error))
    })
  }
}
