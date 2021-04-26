import { useEffect, useState } from "react"

const promiseCache: Record<string, [Promise<string | null>, AbortController]> = {}

const getUrl = (url: string) => {
    if (!(url in promiseCache)) {
        const controller = new AbortController()
        const { signal } = controller
        const promise = fetch(url, { signal })
            .then(response => response.blob())
            .then(blob => URL.createObjectURL(blob))
            .catch(() => {
                delete promiseCache[url]
                return null
            })
        promiseCache[url] = [promise, controller]
    }
    return promiseCache[url]
}

export const useImageLoader = (url: string) => {
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        let isCanceled = false
        const [promise, controller] = getUrl(url)

        promise
            .then(r => !isCanceled ? setImage(r) : null)
            .catch(e => {
                console.log(e)
                return null
            })

        return () => {
            controller.abort()
            isCanceled = true
        }
    }, [url])

    return image
}