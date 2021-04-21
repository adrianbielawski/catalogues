import { useEffect, useState } from "react"

const promiseCache: Record<string, [Promise<string>, AbortController]> = {}

const getUrl = (url: string) => {
    if (!(url in promiseCache)) {
        const controller = new AbortController()
        const { signal } = controller
        const promise = fetch(url, { signal })
            .then(response => response.blob())
            .then(blob => URL.createObjectURL(blob))
        promiseCache[url] = [promise, controller]
    }
    return promiseCache[url]
}

export const useImageLoader = (url: string) => {
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        const [promise, controller] = getUrl(url)

        promise
            .then(r => setImage(r))
            .catch(e => console.log(e))

        return () => {
            controller.abort()
        }
    }, [url])

    return image
}