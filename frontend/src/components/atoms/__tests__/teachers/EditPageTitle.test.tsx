import EditPageTitle from 'components/atoms/teachers/EditPageTitle'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EditPageTitle />', () => {
  const tree = renderer
    .create(
      <EditPageTitle
        text="新しいメールアドレスを入力してください"
        marginBottom={24}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
