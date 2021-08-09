import resolvePath from 'utils/resolvePath'

test('resolvePath.page("teachers", "signin") to be "/teachers/signin"', () => {
  expect(resolvePath.page('teachers', 'signin')).toBe('/teachers/signin')
})

test('resolvePath.page("teachers", "signin") not to be "/students/signin', () => {
  expect(resolvePath.page('teachers', 'signin')).not.toBe('/students/signin')
})

test('resolvePath.page("students", "signin") to be "/students/signin"', () => {
  expect(resolvePath.page('students', 'signin')).toBe('/students/signin')
})

test('resolvePath.page("students", "signin") not to be "/teachers/signin', () => {
  expect(resolvePath.page('students', 'signin')).not.toBe('/teachers/signin')
})

test('resolvePath.image("common/user.png") to be "/assets/img/common/user.png"', () => {
  expect(resolvePath.image('common/user.png')).toBe(
    '/assets/img/common/user.png'
  )
})

test('resolvePath.image("common/user.png") not to be "/public/assets/img/common/user.png"', () => {
  expect(resolvePath.image('common/user.png')).not.toBe(
    '/public/assets/img/common/user.png'
  )
})

test('resolvePath.api("teachers") to be "/api/v1/teachers.json"', () => {
  expect(resolvePath.api('teachers')).toBe('/api/v1/teachers.json')
})

test('resolvePath.api("teachers") not to be "/api/v1/teachers.json"', () => {
  expect(resolvePath.api('teachers')).not.toBe('/api/v1/teachers/me.json')
})

test('resolvePath.api("teachers/me") to be "/api/v1/teachers/me.json"', () => {
  expect(resolvePath.api('teachers/me')).toBe('/api/v1/teachers/me.json')
})

test('resolvePath.api("teachers/me") not to be "/api/v1/teachers.json"', () => {
  expect(resolvePath.api('teachers/me')).not.toBe('/api/v1/teachers.json')
})
