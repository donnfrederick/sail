export default () => {
  const pathname = window.location.pathname
  const match = pathname.match(/(password_renew)\/.+$/)

  return match ? match[0].replace('password_renew/', '') : null
}
