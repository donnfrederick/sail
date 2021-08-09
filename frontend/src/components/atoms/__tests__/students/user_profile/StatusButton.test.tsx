import StatusButton from 'components/atoms/students/user_profile/StatusButton'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StatusButton />', () => {
  const setContentsFn = (contents: JSX.Element) => {}
  const tree = renderer
    .create(
      <Intl>
        <StatusButton
          userId={1}
          isBlocked={true}
          isFavorite={true}
          open={() => {}}
          setContents={setContentsFn}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
