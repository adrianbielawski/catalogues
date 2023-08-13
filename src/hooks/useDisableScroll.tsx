import { useEffect } from 'react'

export const useDisableScroll = (active: boolean) => {
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    if (active) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
    }

    return () => {
      body.style.overflow = ''
    }
  }, [active])
}
