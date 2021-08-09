import assert from 'assert'
import * as React from 'react'
import modal, * as ModalActions from 'reducers/modal'

test('modal/open, modal/close', () => {
  const initialState = modal(undefined, ModalActions.open())
  assert(initialState.isOpened === true)
  const ret = modal(undefined, ModalActions.close())
  assert(ret.isOpened === false)
})

test('modal/setContents', () => {
  const jsxElement = <div />
  const initialState = modal(undefined, ModalActions.setContents(jsxElement))
  assert(initialState.contents === jsxElement)
})
