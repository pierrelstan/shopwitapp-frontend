import {
  FETCH_ITEMS,
  NEW_ITEM,
  REMOVE_ITEM_BY_ID,
  CREATE_ITEM,
  FETCH_ITEMS_BY_USER_ID_FAILED,
} from '../actions/types'

const initialState = {
  items: [],
  createItem: {},
  isLoaded: false,
  error: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ITEM:
      return {
        ...state,
        createItem: action.payload,
        isLoaded: true,
        error: null,
      }

    case FETCH_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      }

    case FETCH_ITEMS_BY_USER_ID_FAILED:
      return state
    case NEW_ITEM:
      return {
        ...state,
        itemById: action.payload,
      }
    case REMOVE_ITEM_BY_ID:
      return {
        ...state,
        removeById: action.payload,
        isLoaded: false,
        error: null,
      }

    default:
      return state
  }
}
