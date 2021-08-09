import * as React from 'react'
import * as renderer from 'react-test-renderer'
import TutorialModalContainer from 'components/molecules/TutorialModalContainer'
import { Intl } from 'components/organisms/Intl'

test('render <ConfirmTerms />', () => {
  const tree = renderer.create(
    <Intl>
      <TutorialModalContainer img={''} text={'Text'} title={'Title'}/>
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
