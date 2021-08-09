import TimeSelectButtons from 'components/molecules/teachers/TimeSelectButtons'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TimeSelectButtons />', () => {
  const tree = renderer
    .create(<TimeSelectButtons type={'from'} onClick={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
