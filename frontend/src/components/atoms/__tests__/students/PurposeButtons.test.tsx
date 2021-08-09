import PurposeButtons from 'components/atoms/students/PurposeButtons'
import * as sampleData from 'mocks/sampleData/me'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <PurposeButtons />', () => {
  const tree = renderer
    .create(
      <Intl>
        <PurposeButtons
          purposes={[]}
          info={sampleData.info}
          register={() => null}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
