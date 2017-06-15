export const setTerminalColors = (Arr, bg) => {
  const styles = []
  for (let i = 0; i < Arr.length; i++) {
    styles.push(`
    .terminal .xterm-color-${i} {
      color: ${Arr[i]};
    }

    .terminal .xterm-bg-color-${i} {
      background-color: ${Arr[i]};
    }
    `)
  }

  if(bg) styles.push(`.app { background-color: ${bg} !important; }`)

  return styles.join('\n')
}
