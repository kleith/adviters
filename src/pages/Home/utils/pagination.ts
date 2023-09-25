export function paginate<T>(arr: T[], size: number) {
  return arr.reduce<T[][]>((acc, val, i) => {
    const idx = Math.floor(i / size)
    const page = acc[idx] || (acc[idx] = [])
    page?.push(val)

    return acc
  }, [])
}
