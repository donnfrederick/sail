import { lifecycle } from 'recompose'

export default lifecycle({
  async componentDidMount() {
    const today = new Date()
    const months = document.getElementById('datetime_2i') as HTMLSelectElement
    const dates = document.getElementById('datetime_3i') as HTMLSelectElement
    const hours = document.getElementById('datetime_4i') as HTMLSelectElement
    const month = today.getMonth()
    const date = today.getDate() - 1
    const hour = today.getHours()

    months ? (months.options[month].selected = true) : null
    dates ? (dates.options[date].selected = true) : null
    hours ? (hours.options[hour].selected = true) : null
  }
})
