import GenderSelect from 'components/molecules/students/GenderSelect'
import * as sampleData from 'mocks/sampleData/me'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <GenderSelect />', () => {
  const tree = renderer
    .create(
      <Intl>
        <GenderSelect
          info={sampleData.info}
          register={() => null}
          currentGender={1}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
