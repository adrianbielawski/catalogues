import { useState, useEffect, useRef, useCallback } from 'react'

export const useElementInView = (
    onIntersecting: (isIntersecting: boolean) => void,
) => {
    const [element, setElement] = useState<HTMLElement | null>(null)
    const elementRef = useCallback(setElement, [])
    const observer = useRef<IntersectionObserver | null>()

    const handleIntersect = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            onIntersecting(entries[0].isIntersecting)
        },
        [onIntersecting]
    )

    const createObserver = useCallback(
        (element: Element) => {
            if (observer.current) {
                observer.current.disconnect()
            }
            observer.current = new IntersectionObserver(handleIntersect)
            observer.current.observe(element)
        },
        [handleIntersect]
    )

    useEffect(() => {
        if (element) {
            createObserver(element)
        }
        return () => {
            if (observer.current) {
                observer.current.disconnect()
            }
        }
    }, [element, createObserver])

    return elementRef
}