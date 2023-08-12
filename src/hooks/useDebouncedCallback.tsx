import { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { fromEvent } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators'

export const useDebouncedCallback = (
  callback: (value: string) => void,
  debounceDuration: number = 500,
  validator: (value: string) => boolean = () => true,
) => {
  const [input, setInput] = useState<HTMLInputElement | null>()
  const inputRef = useCallback(setInput, [])

  useEffect(() => {
    if (input == null) {
      return
    }

    const events$ = fromEvent<ChangeEvent<HTMLInputElement>>(input, 'input')

    const sub = events$
      .pipe(
        map((e) => e.target.value),
        filter(validator),
        debounceTime(debounceDuration),
        distinctUntilChanged(),
      )
      .subscribe(callback)

    return () => {
      sub.unsubscribe()
    }
  }, [input])

  return inputRef
}
