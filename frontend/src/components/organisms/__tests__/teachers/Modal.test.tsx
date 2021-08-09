import Router from 'components/organisms/Router'
import Modal from 'components/organisms/teachers/modal'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Modal />', () => {
  const tree = renderer
    .create(
      <Router>
        <Modal
          answer={'yes/no'}
          heading={'本当に予約を取り消しますか？'}
          text={'予定が合う相手が見つかったらお知らせします。'}
          reservedDate={{ date: '2018年4月15日（日）', time: '11:00 ~ 15:00' }}
        />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
