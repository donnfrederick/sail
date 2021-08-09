export default (waitingTime: number = 0) => {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), waitingTime)
  })
}
