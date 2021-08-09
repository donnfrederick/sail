// Action
const OPEN = 'chat/open'
const CLOSE = 'chat/close'
const SET_CHATS = 'chat/setChats'

interface Open {
  type: typeof OPEN
}

interface Close {
  type: typeof CLOSE
}

interface SetChats {
  type: typeof SET_CHATS
  payload: {
    chats: any[]
  }
}

type Action = Open | Close | SetChats

// Action Creator
export const open = (): Open => {
  return {
    type: OPEN
  }
}

export const close = (): Close => {
  return {
    type: CLOSE
  }
}

export const setChats = (chats: any[]): SetChats => {
  return {
    payload: {
      chats
    },
    type: SET_CHATS
  }
}

// state
export interface State {
  chats: any[] | null
  isOpened: boolean
}

const initialState: State = {
  chats: null,
  isOpened: false
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case OPEN: {
      return {
        ...state,
        isOpened: true
      }
    }
    case CLOSE: {
      return {
        ...state,
        isOpened: false
      }
    }
    case SET_CHATS: {
      return {
        ...state,
        chats: action.payload.chats
      }
    }
    default: {
      return state
    }
  }
}
