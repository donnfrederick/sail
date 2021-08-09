const getVh = () => window.innerHeight * 0.01
const setVhProperty = () =>
  document.documentElement.style.setProperty('--vh', `${getVh()}px`)

export default () => {
  setVhProperty()
  window.addEventListener('resize', () => setVhProperty())
}
