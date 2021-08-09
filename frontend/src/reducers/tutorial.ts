// Action
const SHOW = 'tutorial/show'
const HIDE = 'tutorial/hide'

interface Show {
  type: typeof SHOW
}

interface Hide {
  type: typeof HIDE
}

type Action = Show | Hide

// Action Creator
export const show = (): Show => {
  return {
    type: SHOW
  }
}

export const hide = (): Hide => {
  return {
    type: HIDE
  }
}

// State
export interface State {
  shouldShow: boolean
}

const initialState: State = {
  shouldShow: false
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SHOW: {
      return {
        ...state,
        shouldShow: true
      }
    }
    case HIDE: {
      return {
        ...state,
        shouldShow: false
      }
    }
    default: {
      return state
    }
  }
}
