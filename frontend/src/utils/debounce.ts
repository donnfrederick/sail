let timeoutId: number | NodeJS.Timer

export default (func: () => void, wait = 100) => {
  clearTimeout(timeoutId as number)
  timeoutId = setTimeout(() => func(), wait)
}
