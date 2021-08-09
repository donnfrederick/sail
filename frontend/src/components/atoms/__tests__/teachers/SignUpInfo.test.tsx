import SignUpInfo from 'components/atoms/teachers/SignUpInfo'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <SignUpInfo />', () => {
  const step = 1
  const label = 'メールアドレス'
  const content = 'sail@example.com'
  const tree = renderer
    .create(<SignUpInfo step={step} label={label} content={content} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
