import HeaderText from 'components/atoms/evaluation/HeaderText'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <HeaderText />', () => {
  const tree = renderer
    .create(
      <HeaderText
        width={650}
        headerFontSize={40}
        subHeaderFontSize={32}
        marginBottom={20}
        texts={[
          'このかたの日本語レベルはどうdでしたか？',
          'どれか１つだけ選んでください。'
        ]}
        subHeaderAlign="left"
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
