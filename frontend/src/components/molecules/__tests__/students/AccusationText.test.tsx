import AccusationText from 'components/molecules/students/AccusationText'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <AccusationText />', () => {
  const tree = renderer
    .create(
      <Intl>
        <AccusationText
          isReportModalOpen={true}
          closeReportModal={() => null}
          onAccusationClick={() => null}
          onBlockClick={() => null}
          onClick={() => null}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
