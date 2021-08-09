export default <T = number>(enumVar: any) =>
  Object.values(enumVar)
    .filter((value: string | number) => typeof value === 'number')
    .map((key: T) => ({
      text: enumVar[key],
      value: key
    }))
