export const isBlank = (str) =>
  (!str || /^\s*$/.test(str))

export const isEmpty = (str) =>
  (!str || 0 === str.length)

export const isEmptyBlank = (str) =>
  isBlank(str) || isEmpty(str)
