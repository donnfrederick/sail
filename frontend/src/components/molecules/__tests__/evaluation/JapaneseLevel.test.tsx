import JapaneseLevel from 'components/molecules/evaluation/JapaneseLevel'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

// test('render <JapaneseLevel />', () => {
//   const isTeacher = true
//   const stepState = React.useState<number>(2)
//   const japaneseLevelState = React.useState<number>(4)
//   const tree = renderer.create(
//     <JapaneseLevel
//       japaneseLevelState={japaneseLevelState}
//       isTeacher={isTeacher}
//       stepState={stepState}
//     />
//   ).toJSON()
//   expect(tree).toMatchSnapshot()
// })

test('render <JapaneseLevel />', () => {
  const Tree = () => {
    const isTeacher = true
    const stepState = React.useState<number>(2)
    const japaneseLevelState = React.useState<number>(4)
    return (
      <JapaneseLevel
        japaneseLevelState={japaneseLevelState}
        isTeacher={isTeacher}
        stepState={stepState}
      />
    )
  }
  expect(renderer.create(<Tree />).toJSON()).toMatchSnapshot()
})
