import {
  RefObject,
  LegacyRef,
  MutableRefObject,
  RefCallback,
  useEffect,
} from 'react'
import { ErrorObject } from './globalTypes'

export const scrollTop = () => {
  document.body.scrollTo({ top: 0, behavior: 'smooth' })
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
}

export const mergeRefs =
  <T = any>(refs: Array<MutableRefObject<T> | LegacyRef<T>>): RefCallback<T> =>
  (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as MutableRefObject<T | null>).current = value
      }
    })
  }

export const mod = (i: number, n: number): number => ((i % n) + n) % n

export const getErrorMessage = (error: ErrorObject) =>
  Object.values(error.response.data)[0][0] ?? 'Something went wrong'

export const useConfirmOnEnter = (
  element: RefObject<any>,
  callback: (...args: any[]) => any,
) => {
  useEffect(() => {
    element.current?.addEventListener('keyup', handleKeyUp)
    return () => {
      element.current?.removeEventListener('keyup', handleKeyUp)
    }
  }, [callback])

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      callback()
    }
  }
}
