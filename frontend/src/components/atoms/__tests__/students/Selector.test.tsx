import Selector, { Option } from 'components/atoms/students/Selector'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Selector />', () => {
  const options: Option[] = [
    {
      value: 'value01',
      text: 'text01'
    },
    {
      value: 'value02',
      text: 'text02'
    }
  ]
  const tree = renderer
    .create(
      <Intl>
        <Selector defaultValue="" options={options} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
