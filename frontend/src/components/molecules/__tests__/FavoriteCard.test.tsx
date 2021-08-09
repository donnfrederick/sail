import FavoriteCard from 'components/molecules/FavoriteCard'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

// 仮
import { conversation } from 'mocks/sampleData/conversation'

test('render <FavoriteCard />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <FavoriteCard user={conversation.users[0]} />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
