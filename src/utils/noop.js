export const noop = () => {
  const err = new Error()
  console.log('This function is empty. Stack trace:', err.stack.replace('Error', ''))
}
