import { useState } from 'react'

type returnd = [boolean, (seted?: boolean) => void]

const useToggleState = (initState = false): returnd => {
  const [value, setValue] = useState(initState)
  function toggleState(seted?: boolean) {
    const nextValue = seted === undefined ? !value : seted
    setValue(nextValue)
  }
  return [value, toggleState]
}

export default useToggleState
