import SubmitButton from 'components/molecules/evaluation/SubmitButton'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <SubmitButton />', () => {
  const tree = renderer
    .create(
      <SubmitButton
        fontSize={28}
        isActive={true}
        onClick={() => console.log('clicked')}
        text="次へ"
        type="blue"
        width={360}
        height={250}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
