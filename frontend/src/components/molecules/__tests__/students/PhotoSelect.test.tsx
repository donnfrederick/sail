import PhotoSelect from 'components/molecules/students/PhotoSelect'
import * as sampleData from 'mocks/sampleData/me'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <PhotoSelect />', () => {
  const tree = renderer
    .create(
      <Intl>
        <PhotoSelect
          info={sampleData.info}
          currentPicture={''}
          register={() => null}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
