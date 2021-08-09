import ModalError from 'components/molecules/modal/Error'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ModalError /> with message', () => {
  const tree = renderer
    .create(
      <Intl>
        <ModalError message={'fuga'} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('render <ModalError />', () => {
  const tree = renderer
    .create(
      <Intl>
        <ModalError />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
