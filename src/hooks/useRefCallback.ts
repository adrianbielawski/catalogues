import { Ref, useCallback, useState } from 'react'

const useCallbackRef = <E extends HTMLElement>(): [E | null, Ref<E>] => {
  const [rect, setRect] = useState<E | null>(null)
  const ref = useCallback((node: E) => {
    if (node !== null) {
      setRect(node)
    }
  }, [])
  return [rect, ref]
}

export default useCallbackRef
