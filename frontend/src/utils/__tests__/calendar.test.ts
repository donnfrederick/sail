import calendar, { getDays } from 'utils/calendar'

test('calendar(2018)(5) to equal `\
  [\
    [ 0, 0, 1, 2, 3, 4, 5 ],\
    [ 6, 7, 8, 9, 10, 11, 12 ],\
    [ 13, 14, 15, 16, 17, 18, 19 ],\
    [ 20, 21, 22, 23, 24, 25, 26 ],\
    [ 27, 28, 29, 30, 31, 0, 0 ]\
  ]"', () => {
  const expected = [
    [0, 0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 0, 0]
  ]
  expect(calendar(2018)(5)).toEqual(expected)
})

test('getDays("ja") to equal ["日", "月", "火", "水", "木", "金", "土"]', () => {
  const expected = ['日', '月', '火', '水', '木', '金', '土']
  expect(getDays('ja')).toEqual(expected)
})

test('getDays("en") to equal ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]', () => {
  const expected = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  expect(getDays('en')).toEqual(expected)
})
