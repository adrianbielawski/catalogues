import { useEffect, useState } from 'react'
import { useTypedSelector } from 'store/storeConfig'

const useMinContentHeight = (element: HTMLElement | null) => {
  const { screenHeight } = useTypedSelector((state) => state.modules.app)

  const [minHeight, setMinHeight] = useState(0)

  useEffect(() => {
    if (!element) {
      return
    }
    const top = element.getBoundingClientRect().top
    const minHeight = screenHeight - top - window.scrollY
    setMinHeight(minHeight)
  }, [element, screenHeight])

  return minHeight
}

export default useMinContentHeight
