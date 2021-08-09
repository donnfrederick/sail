import axios from 'axios'
import * as LocationsModels from 'models/locations'
import * as qs from 'qs'
import { Dispatch } from 'react-redux'
import resolvePath from 'utils/resolvePath'

// Action
const GET_COUNTRIES_REQUEST = 'locations/getCountriesRequest'
const GET_COUNTRIES_SUCCESS = 'locations/getCountriesSuccess'
const GET_COUNTRIES_FAILURE = 'locations/getCountriesFailure'
const GET_TIMEZONES_REQUEST = 'locations/getTimezonesRequest'
const GET_TIMEZONES_SUCCESS = 'locations/getTimezonesSuccess'
const GET_TIMEZONES_FAILURE = 'locations/getTimezonesFailure'

interface GetCountriesRequest {
  type: typeof GET_COUNTRIES_REQUEST
}

interface GetCountriesSuccess {
  type: typeof GET_COUNTRIES_SUCCESS
  payload: {
    countries: LocationsModels.Countries
  }
}

interface GetCountriesFailure {
  type: typeof GET_COUNTRIES_FAILURE
  payload: {
    error: any
  }
}

interface GetTimezonesRequest {
  type: typeof GET_TIMEZONES_REQUEST
}

interface GetTimezonesSuccess {
  type: typeof GET_TIMEZONES_SUCCESS
  payload: {
    timezones: LocationsModels.Timezones
  }
}

interface GetTimezonesFailure {
  type: typeof GET_TIMEZONES_FAILURE
  payload: {
    error: any
  }
}

type Action =
  | GetCountriesRequest
  | GetCountriesSuccess
  | GetCountriesFailure
  | GetTimezonesRequest
  | GetTimezonesSuccess
  | GetTimezonesFailure

// Action Creator
export const getCountriesRequest = (): GetCountriesRequest => {
  return {
    type: GET_COUNTRIES_REQUEST
  }
}

export const getCountriesSuccess = (
  countries: LocationsModels.Countries
): GetCountriesSuccess => {
  return {
    payload: {
      countries
    },
    type: GET_COUNTRIES_SUCCESS
  }
}

export const getCountriesFailure = (error: any): GetCountriesFailure => {
  return {
    payload: {
      error
    },
    type: GET_COUNTRIES_FAILURE
  }
}

export const getCountries = () => (dispatch: Dispatch) => {
  dispatch(getCountriesRequest())
  return axios
    .get(resolvePath.api('locations/countries'))
    .then(response => dispatch(getCountriesSuccess(response.data)))
    .catch(error => {
      dispatch(getCountriesFailure(error))
      throw error
    })
}

export const getTimezonesRequest = (): GetTimezonesRequest => {
  return {
    type: GET_TIMEZONES_REQUEST
  }
}

export const getTimezonesSuccess = (
  timezones: LocationsModels.Timezones
): GetTimezonesSuccess => {
  return {
    payload: {
      timezones
    },
    type: GET_TIMEZONES_SUCCESS
  }
}

export const getTimezonesFailure = (error: any): GetTimezonesFailure => {
  return {
    payload: {
      error
    },
    type: GET_TIMEZONES_FAILURE
  }
}

export const getTimezones = (country?: string) => (dispatch: Dispatch) => {
  dispatch(getTimezonesRequest())
  const request = {
    country
  }
  return axios
    .get(`${resolvePath.api('locations/timezones')}?${qs.stringify(request)}`)
    .then(response => dispatch(getTimezonesSuccess(response.data)))
    .catch(error => {
      dispatch(getTimezonesFailure(error))
      throw error
    })
}

// State
export interface State {
  countries: LocationsModels.Countries
  error: any
  isFetching: boolean
  timezones: LocationsModels.Timezones
}

const initialState: State = {
  countries: {
    data: [],
    meta: {
      default_country: '',
      default_timezone: ''
    }
  },
  error: null,
  isFetching: false,
  timezones: {
    data: [],
    meta: {
      default_country: '',
      default_timezone: ''
    }
  }
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case GET_COUNTRIES_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_COUNTRIES_SUCCESS: {
      return {
        ...state,
        countries: { ...{}, ...action.payload.countries },
        isFetching: false
      }
    }
    case GET_COUNTRIES_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case GET_TIMEZONES_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_TIMEZONES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        timezones: { ...{}, ...action.payload.timezones }
      }
    }
    case GET_TIMEZONES_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    default: {
      return state
    }
  }
}
