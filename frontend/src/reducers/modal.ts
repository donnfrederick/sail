// Action
const OPEN = 'modal/open'
const CLOSE = 'modal/close'
const SET_CONTENTS = 'modal/setContents'

interface Open {
  type: typeof OPEN
}

interface Close {
  type: typeof CLOSE
}

interface SetContents {
  type: typeof SET_CONTENTS
  payload: {
    contents: JSX.Element
  }
}

type Action = Open | Close | SetContents

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

export const setContents = (contents: JSX.Element): SetContents => {
  return {
    payload: {
      contents
    },
    type: SET_CONTENTS
  }
}

// state
export interface State {
  contents: JSX.Element | null
  isOpened: boolean
}

const initialState: State = {
  contents: null,
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
    case SET_CONTENTS: {
      return {
        ...state,
        contents: action.payload.contents
      }
    }
    default: {
      return state
    }
  }
}
