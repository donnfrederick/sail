import SupportParagraph from 'components/atoms/students/SupportParagraph'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <SupportParagraph />', () => {
  const tree = renderer.create(
    <Intl>
      <SupportParagraph text="Paragraph" />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
