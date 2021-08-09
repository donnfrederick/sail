import SupportHeading from 'components/atoms/teachers/SupportHeading'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <SupportHeading />', () => {
  const tree = renderer
    .create(<SupportHeading text={'推奨動作環境'} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
