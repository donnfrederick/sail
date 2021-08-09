export default () => {
  const pathname = window.location.pathname

  const isTeachers = (path: string) => path.includes('teachers')

  const viewportSettings = `width=${isTeachers(pathname) ? 800 : 750}`

  const viewport = document.querySelector('meta[name="viewport"]')

  if (viewport) {
    viewport.setAttribute('content', viewportSettings)
  }
}
