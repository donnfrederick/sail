import NameInput from 'components/molecules/students/NameInput'
import * as sampleData from 'mocks/sampleData/me'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <NameInput />', () => {
  const tree = renderer
    .create(
      <Intl>
        <div>
          <NameInput
            info={sampleData.info}
            register={() => null}
            isJaName={true}
            myName="Helte Sail"
          />
          <NameInput
            info={sampleData.info}
            register={() => null}
            isJaName={false}
            myName="へるて せいる"
          />
        </div>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
