import Memo from 'components/atoms/Memo'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Memo />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Memo
          value="foobar ほげふが"
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            console.log(event.target.value)
          }
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
