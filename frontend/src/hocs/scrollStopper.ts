import { lifecycle } from 'recompose'

export default lifecycle({
  componentDidMount() {
    window.addEventListener('scroll', cancelScroll, false)
    window.addEventListener('touchmove', cancelScroll, false)
    window.addEventListener('mousewheel', cancelScroll, false)
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', cancelScroll, false)
    window.removeEventListener('touchmove', cancelScroll, false)
    window.removeEventListener('mousewheel', cancelScroll, false)
  }
})

const cancelScroll = (event: Event) => {
  event.preventDefault()
  return false
}
