import JapaneseLevelSelect from 'components/molecules/students/JapaneseLevelSelect'
import * as sampleData from 'mocks/sampleData/me'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <JapaneseLevelSelect />', () => {
  const tree = renderer
    .create(
      <Intl>
        <JapaneseLevelSelect
          info={sampleData.info}
          register={() => null}
          currentLevel={1}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
