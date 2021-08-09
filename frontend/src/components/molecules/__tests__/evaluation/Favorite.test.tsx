import Favorite from 'components/molecules/evaluation/Favorite'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Favorite />', () => {
  const Tree = () => {
    const isTeacher = true
    const stepState = React.useState<number>(6)
    const favoriteState = React.useState<boolean>(false)
    return (
      <Router>
        <Favorite
          favoriteState={favoriteState}
          isAlreadyFavorite={false}
          isTeacher={isTeacher}
          onSubmit={() => {}}
          stepState={stepState}
        />
      </Router>
    )
  }

  expect(renderer.create(<Tree />).toJSON()).toMatchSnapshot()
})
