export default (attempt: number = 1, delay: number = 1.5) => {
  return Math.floor(Math.random() * Math.pow(2, attempt) * delay)
}
