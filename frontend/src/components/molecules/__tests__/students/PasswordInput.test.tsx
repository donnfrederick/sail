import * as React from 'react'
import * as renderer from 'react-test-renderer'
import PasswordInput from 'components/molecules/students/PasswordInput'
import { Intl } from 'components/organisms/Intl'

test('render <FooterButton />', () => {
  const info = {
    email: '',
    password: '',
    current_password: '',
    conversation_level: 0,
    level: 0,
    country: '',
    timezone: '',
    name: '',
    name_ja: '',
    preferred_name: 1,
    gender: 0,
    custom_gender: '',
    picture: '',
    hobbies: [],
    purposes: [],
    desired_condition: 0,
    introduce: ''
  }
  const tree = renderer.create(
    <Intl>
      <PasswordInput info={info} register={() => null} />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
