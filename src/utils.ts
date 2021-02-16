import { LegacyRef, MutableRefObject, RefCallback } from "react"

export const isElementInViewport = (el: HTMLElement) => {
    var rect = el.getBoundingClientRect()

    return (
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight)
    )
}

export const scrollTop = () => {
    document.body.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
}

export const mergeRefs = <T = any>(
    refs: Array<MutableRefObject<T> | LegacyRef<T>>
): RefCallback<T> => {
    return (value) => {
        refs.forEach((ref) => {
            if (typeof ref === "function") {
                ref(value)
            } else if (ref != null) {
                (ref as MutableRefObject<T | null>).current = value
            }
        })
    }
}

export const mod = (i: number, n: number): number => ((i % n) + n) % n