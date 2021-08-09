import NationalitySelect from 'components/molecules/students/NationalitySelect'
import * as sampleLocations from 'mocks/sampleData/locations'
import * as sampleData from 'mocks/sampleData/me'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <NationalitySelect />', () => {
  const tree = renderer
    .create(
      <Intl>
        <NationalitySelect
          info={sampleData.info}
          register={() => null}
          countries={sampleLocations.countries}
          currentCountry={'Japan'}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
