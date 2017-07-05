export const mergeArrays = (first, second) => {
  let res = first || []
  for (let i = 0; i < second.length; i++) {
    res[i] = second[i]
  }

  return res
}
