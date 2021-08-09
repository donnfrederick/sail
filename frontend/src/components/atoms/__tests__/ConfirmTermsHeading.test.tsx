import ConfirmTermsHeading from 'components/atoms/ConfirmTermsHeading'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConfirmTermsHeading />', () => {
  const tree = renderer
    .create(<ConfirmTermsHeading text={'ConfirmTermsHeading'} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
