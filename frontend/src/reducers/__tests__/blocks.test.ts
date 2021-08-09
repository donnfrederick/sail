import assert from 'assert'
import * as sample from 'mocks/sampleData/blocks'
import blocks, * as BlocksActions from 'reducers/blocks'

test('blocks/forward', () => {
  const initialState = blocks(undefined, BlocksActions.forward())
  assert(initialState.page === 2)
})

test('blocks/clear', () => {
  const initialState = blocks(undefined, BlocksActions.clear())
  assert(initialState.blocks.length === 0 && initialState.page === 1)
})

test('blocks/getBlocksRequest, blocks/getBlocksSuccess, blocks/getBlocksFailure', () => {
  const initialState = blocks(undefined, BlocksActions.getBlocksRequest())
  assert(initialState.isFetching === true)
  const success = blocks(
    undefined,
    BlocksActions.getBlocksSuccess(sample.blocks)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.blocks) === JSON.stringify(sample.blocks.data) &&
      JSON.stringify(success.meta) === JSON.stringify(sample.blocks.meta)
  )
  const failure = blocks(undefined, BlocksActions.getBlocksFailure('error'))
  assert(failure.isFetching === false && failure.error === 'error')
})

test('blocks/postBlocksRequest, blocks/postBlocksSuccess, blocks/postBlocksFailure', () => {
  const initialState = blocks(undefined, BlocksActions.postBlocksRequest())
  assert(initialState.isFetching === true)
  const success = blocks(
    undefined,
    BlocksActions.postBlocksSuccess(sample.blockedUser)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.blockedUser) === JSON.stringify(sample.blockedUser)
  )
  const failure = blocks(undefined, BlocksActions.postBlocksFailure('error'))
  assert(failure.isFetching === false && failure.error === 'error')
})

test('blocks/deleteBlocksRequest, blocks/deleteBlocksSuccess, blocks/deleteBlocksFailure', () => {
  const initialState = blocks(undefined, BlocksActions.deleteBlocksRequest())
  assert(initialState.isFetching === true)
  const success = blocks(
    undefined,
    BlocksActions.deleteBlocksSuccess(sample.blockedUser)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.unblockedUser) ===
        JSON.stringify(sample.blockedUser)
  )
  const failure = blocks(undefined, BlocksActions.deleteBlocksFailure('error'))
  assert(failure.isFetching === false && failure.error === 'error')
})

test('blocks/getBlocksId, blocks/clearBlocksId', () => {
  const get = blocks(
    undefined,
    BlocksActions.getBlocksId(sample.blocks.data[0])
  )
  assert(
    JSON.stringify(get.blockedUser) === JSON.stringify(sample.blocks.data[0])
  )
  const clear = blocks(undefined, BlocksActions.clearBlocksId())
  assert(clear.blockedUser === null)
})
