import assert from 'assert'
import * as sample from 'mocks/sampleData/favorites'
import favorites, * as FavoritesActions from 'reducers/favorites'

test('favorites/forward', () => {
  const initialState = favorites(undefined, FavoritesActions.forward())
  assert(initialState.page === 2)
})

test('favorites/clear', () => {
  const initialState = favorites(undefined, FavoritesActions.clear())
  assert(initialState.favorites.length === 0 && initialState.page === 1)
})

test('favorites/getFavoritesRequest, favorites/getFavoritesSuccess, favorites/getFavoritesFailure', () => {
  const initialState = favorites(
    undefined,
    FavoritesActions.getFavoritesRequest()
  )
  assert(initialState.isFetching === true)
  const success = favorites(
    undefined,
    FavoritesActions.getFavoritesSuccess(sample.favorites)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.favorites) ===
        JSON.stringify(sample.favorites.data) &&
      JSON.stringify(success.meta) === JSON.stringify(sample.favorites.meta)
  )
  const failure = favorites(
    undefined,
    FavoritesActions.getFavoritesFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('favorites/postFavoritesRequest, favorites/postFavoritesSuccess, favorites/postFavoritesFailure', () => {
  const initialState = favorites(
    undefined,
    FavoritesActions.postFavoritesRequest()
  )
  assert(initialState.isFetching === true)
  const success = favorites(
    undefined,
    FavoritesActions.postFavoritesSuccess(sample.favoritedUser)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.favoritedUser) ===
        JSON.stringify(sample.favoritedUser)
  )
  const failure = favorites(
    undefined,
    FavoritesActions.postFavoritesFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('favorites/deleteFavoritesRequest, favorites/deleteFavoritesSuccess, favorites/deleteFavoritesFailure', () => {
  const initialState = favorites(
    undefined,
    FavoritesActions.deleteFavoritesRequest()
  )
  assert(initialState.isFetching === true)
  const success = favorites(
    undefined,
    FavoritesActions.deleteFavoritesSuccess(sample.favoritedUser)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.unfavoritedUser) ===
        JSON.stringify(sample.favoritedUser)
  )
  const failure = favorites(
    undefined,
    FavoritesActions.deleteFavoritesFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('favorites/getFavoritesId, favorites/clearFavoritesId', () => {
  const get = favorites(
    undefined,
    FavoritesActions.getFavoritesId(sample.favorites.data[0])
  )
  assert(
    JSON.stringify(get.favoritedUser) ===
      JSON.stringify(sample.favorites.data[0])
  )
  const clear = favorites(undefined, FavoritesActions.clearFavoritesId())
  assert(clear.favoritedUser === null)
})
