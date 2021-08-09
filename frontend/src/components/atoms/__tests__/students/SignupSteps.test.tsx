import SignUpSteps from 'components/atoms/students/SignupSteps'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <SignUpSteps />', () => {
  const tree = renderer
    .create(
      <Intl>
        <SignUpSteps currentStep={1} stepCount={4} onClickBackButton={() => null} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
