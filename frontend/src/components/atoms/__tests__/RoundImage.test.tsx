import RoundImage from 'components/atoms/RoundImage'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import resolvePath from 'utils/resolvePath'
import { Intl } from 'components/organisms/Intl'

const src = resolvePath.image('/common/user.png')
const src2x = resolvePath.image('/common/user@2x.png')
const src3x = resolvePath.image('/common/user@3x.png')

test('render <RoundImage />', () => {
  const tree = renderer
    .create(
      <Intl>
        <RoundImage
          src={src}
          srcSet={`${src} 1x, ${src2x} 2x, ${src3x} 3x`}
          size={200}
          marginBottom={24}
          code='camera'
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
