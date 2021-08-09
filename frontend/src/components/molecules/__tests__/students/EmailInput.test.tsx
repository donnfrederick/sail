import EmailInput from 'components/molecules/students/EmailInput'
import * as sampleData from 'mocks/sampleData/me'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <FooterButton />', () => {
  const tree = renderer
    .create(
      <Intl>
        <EmailInput info={sampleData.info} register={() => null} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
