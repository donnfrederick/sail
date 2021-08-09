import AccusationText from 'components/molecules/teachers/AccusationText'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <AccusationText />', () => {
  const tree = renderer
    .create(
      <AccusationText
        isReportModalOpen={true}
        closeReportModal={() => null}
        onAccusationClick={() => null}
        onBlockClick={() => null}
        onClick={() => null}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
