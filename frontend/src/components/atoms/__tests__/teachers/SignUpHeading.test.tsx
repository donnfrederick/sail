import SignUpHeading from 'components/atoms/teachers/SignUpHeading'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <SignUpHeading />', () => {
  const tree = renderer
    .create(
      <SignUpHeading text={'メールアドレスとパスワードを\n入力してください'} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
