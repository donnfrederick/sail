export const hasError = (target: string) => (error: any) => {
  return error &&
    error.response &&
    error.response.data &&
    error.response.data.error &&
    error.response.data.error.message
    ? !!error.response.data.error.message.find((element: string) => {
        return element.includes(target)
      })
    : false
}

export const getErrorMessage = (target: string) => (error: any) => {
  return hasError(target)(error)
    ? error.response.data.error.message.find((element: string) => {
        return element.includes(target)
      })
    : null
}
