import SupportParagraph from 'components/atoms/teachers/SupportParagraph'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <SupportParagraph />', () => {
  const tree = renderer
    .create(<SupportParagraph text={'推奨動作環境'} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
