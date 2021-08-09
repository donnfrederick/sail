import ErrorMessage from 'components/atoms/students/ErrorMessage'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ErrorMessage />', () => {
  const tree = renderer.create(
    <Intl>
      <ErrorMessage message={'Error'} />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
