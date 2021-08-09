import MypageInfoHead from 'components/molecules/students/MypageInfoHead'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <MypageInfoHead />', () => {
  const tree = renderer
    .create(
      <Intl>
        <MypageInfoHead
          authToken={''}
          reservations={null}
          forward={() => null}
          back={() => null}
          page={1}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
