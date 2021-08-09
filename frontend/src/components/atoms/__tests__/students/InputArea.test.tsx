import InputArea from 'components/atoms/students/InputArea'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <InputArea />', () => {
  const tree = renderer
    .create(
      <Intl>
        <InputArea
          placeholder="input area"
          type="text"
          defaultValue=""
          onInput={() => null}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
