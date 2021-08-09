import HobbieButtons from 'components/atoms/students/HobbieButtons'
import * as sampleData from 'mocks/sampleData/me'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <HobbieButtons />', () => {
  const tree = renderer
    .create(
      <Intl>
        <HobbieButtons
          hobbies={[]}
          info={sampleData.info}
          register={() => null}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
