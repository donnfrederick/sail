import ConfirmTermsParagraph from 'components/atoms/ConfirmTermsParagraph'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConfirmTermsParagraph />', () => {
  const tree = renderer
    .create(<ConfirmTermsParagraph text={'ConfirmTermsParagraph'} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
