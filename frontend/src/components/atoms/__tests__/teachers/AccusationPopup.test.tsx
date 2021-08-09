import AccusationPopup from 'components/atoms/teachers/AccusationPopup'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <AccusationPopup />', () => {
  const tree = renderer
    .create(
      <AccusationPopup
        isOpen={true}
        onAccusationClick={() => null}
        onBlockClick={() => null}
        closeReportModal={() => null}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
