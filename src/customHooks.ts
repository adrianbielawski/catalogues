import { useState, useEffect, useRef } from 'react'

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