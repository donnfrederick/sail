// Action
const OPEN = 'report_modal/open'
const CLOSE = 'report_modal/close'

interface Open {
  type: typeof OPEN
}

interface Close {
  type: typeof CLOSE
}

type Action = Open | Close

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

// State
export interface State {
  isOpened: boolean
}

const initialState: State = {
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
    default: {
      return state
    }
  }
}
