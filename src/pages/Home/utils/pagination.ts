export function paginate<T>(arr: T[], size: number) {
  return arr.reduce<T[][]>((acc, val, i) => {
    let idx = Math.floor(i / size)
    let page = acc[idx] || (acc[idx] = [])
    page?.push(val)

    return acc
  }, [])
}
