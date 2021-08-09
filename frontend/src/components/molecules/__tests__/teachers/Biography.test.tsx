import Biography from 'components/molecules/teachers/Biography'
import * as sampleData from 'mocks/sampleData/me'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Biography />', () => {
  const tree = renderer.create(<Biography me={sampleData.me} />).toJSON()
  expect(tree).toMatchSnapshot()
})
