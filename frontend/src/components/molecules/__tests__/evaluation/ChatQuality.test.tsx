import ChatQuality from 'components/molecules/evaluation/ChatQuality'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ChatQuality />', () => {
  const Tree = () => {
    const isTeacher = true
    const stepState = React.useState<number>(4)
    const chatQualityState = React.useState<number[]>([])
    return (
      <ChatQuality
        chatQualityState={chatQualityState}
        isTeacher={isTeacher}
        stepState={stepState}
        onSubmit={() => console.log('submit')}
      />
    )
  }
  expect(renderer.create(<Tree />).toJSON()).toMatchSnapshot()
})
