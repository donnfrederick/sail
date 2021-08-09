import * as React from 'react'
import * as renderer from 'react-test-renderer'
import PasswordInput from 'components/molecules/students/PasswordInput'
import { Intl } from 'components/organisms/Intl'
import * as sampleData from 'mocks/sampleData/me'

test('render <FooterButton />', () => {
  const tree = renderer.create(
    <Intl>
      <PasswordInput info={sampleData.info} register={() => null} />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
