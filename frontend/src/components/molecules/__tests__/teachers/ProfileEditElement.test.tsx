import ProfileEditElement from 'components/molecules/teachers/ProfileEditElement'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ProfileEditElement />', () => {
  const tree = renderer
    .create(
      <Router>
        <ProfileEditElement
          label="メールアドレス"
          link={'teachers/mypage/profile'}
          content={''}
        />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
