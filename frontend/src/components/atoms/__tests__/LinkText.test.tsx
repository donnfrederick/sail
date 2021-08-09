import LinkText from 'components/atoms/LinkText'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import resolvePath from 'utils/resolvePath'
import { Intl } from 'components/organisms/Intl'

test('render <LinkText />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <LinkText
            text={'ホームページに戻る'}
            to={resolvePath.page('students', 'mypage')}
          />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
