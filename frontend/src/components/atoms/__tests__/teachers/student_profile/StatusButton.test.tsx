import StatusButton from 'components/atoms/teachers/user_profile/StatusButton'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <StatusButton />', () => {
  const setContentsFn = (contents: JSX.Element) => {}
  const tree = renderer
    .create(
      <StatusButton
        isBlocked={true}
        isFavorite={true}
        userId={1}
        open={() => {}}
        setContents={setContentsFn}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
