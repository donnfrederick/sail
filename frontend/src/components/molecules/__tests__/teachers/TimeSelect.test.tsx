import TimeSelect from 'components/molecules/teachers/TimeSelect'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TimeSelect />', () => {
  const tree = renderer
    .create(
      <TimeSelect
        startTime={'10:00'}
        endTime={'15:00'}
        type={'from'}
        setStart={() => null}
        setEnd={() => null}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
