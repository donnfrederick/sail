import Checkbox from 'components/atoms/evaluation/Checkbox'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Checkbox />', () => {
  const tree = renderer
    .create(
      <Checkbox
        isCenter={true}
        text="映像がたまに切れてた"
        isActive={true}
        onSelect={() => console.log('selected')}
        onUnselect={() => console.log('unselected')}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
