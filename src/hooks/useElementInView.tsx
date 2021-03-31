import { useState, useEffect, useRef, useCallback } from 'react'

export const useElementInView = (
    onIntersecting: (isIntersecting: boolean) => void,
) => {
    const [element, setElement] = useState<HTMLElement | null>(null)
    const elementRef = useCallback(setElement, [])
    const observer = useRef<IntersectionObserver | null>()

    useEffect(() => {
        if (element) {
            createObserver(element)
        }
        return () => {
            if (observer.current) {
                observer.current.disconnect()
            }
        }
    }, [element])

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        onIntersecting(entries[0].isIntersecting)
    }

    const createObserver = (element: Element) => {
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(handleIntersect)
        observer.current.observe(element)
    }

    return elementRef
}