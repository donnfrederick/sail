import MypageInfoHead from 'components/molecules/teachers/MypageInfoHead'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <MypageInfoHead />', () => {
  const tree = renderer
    .create(
      <MypageInfoHead
        authToken={''}
        reservations={null}
        forward={() => null}
        back={() => null}
        page={1}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
