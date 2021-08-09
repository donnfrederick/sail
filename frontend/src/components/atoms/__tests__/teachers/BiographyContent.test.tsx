import BiographyContent from 'components/atoms/teachers/BiographyContent'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <BiographyContent />', () => {
  const tree = renderer
    .create(<BiographyContent text="日本語を教えたい" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
