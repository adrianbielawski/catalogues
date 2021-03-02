import { useState, useEffect, useRef, useCallback } from 'react'
import { useAppDispatch } from 'store/storeConfig'
import { Action } from "@reduxjs/toolkit"
import { fromEvent } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators'

export const useDelay = (
    isDelayed: boolean = false,
    delayDuration: number = 300,
) => {
    const timeout = useRef<ReturnType<typeof setTimeout>>()
    const [delayCompleated, setDelayCompleated] = useState(false)

    useEffect(() => {
        if (isDelayed) {
            timeout.current = setTimeout(() => {
                setDelayCompleated(true)
            }, delayDuration)
        } else if (!isDelayed && timeout.current) {
            clearTimeout(timeout.current)
            setDelayCompleated(false)
        }

        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
    }, [isDelayed])

    return delayCompleated
}

export const useFirstRender = () => {
    const firstRender = useRef(true)

    useEffect(() => {
        firstRender.current = false
    }, [])

    return firstRender.current
}

export const useDebouncedDispatch = (
    actionCreator: (value: string) => Action,
    debounceDuration: number = 500,
    validator: (value: string) => boolean = () => true,
) => {
    const dispatch = useAppDispatch()
    const [input, setInput] = useState<HTMLInputElement | null>()
    const inputRef = useCallback(setInput, [])

    useEffect(() => {
        if (!input) {
            return
        }

        const events$ = fromEvent<React.ChangeEvent<HTMLInputElement>>(input, 'input')

        const sub = events$.pipe(
            map(e => e.target!.value),
            filter(validator),
            debounceTime(debounceDuration),
            distinctUntilChanged(),
        ).subscribe(value => 
            dispatch(actionCreator(value))
        )

        return () => {
            sub.unsubscribe()
        }
    }, [input])

    return inputRef
}