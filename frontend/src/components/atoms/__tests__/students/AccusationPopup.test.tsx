import AccusationPopup from 'components/atoms/students/AccusationPopup'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <AccusationPopup />', () => {
  const tree = renderer
    .create(
      <Intl>
        <AccusationPopup
          isOpen={true}
          onAccusationClick={() => null}
          onBlockClick={() => null}
          closeReportModal={() => null}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
