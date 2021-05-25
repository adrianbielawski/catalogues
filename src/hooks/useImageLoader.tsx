import { useEffect, useState } from "react"
import { isNil } from "lodash"

type CacheItem = {
    promise?: Promise<string | undefined>,
    controller?: AbortController,
    refCount: number,
}

const promiseCache: Record<string, CacheItem> = {}

const getUrl = (url: string) => {
    const cacheItem = promiseCache[url] ?? { refCount: 0 }
    cacheItem.refCount++

    if (cacheItem.promise === undefined) {
        cacheItem.controller = new AbortController()
        const { signal } = cacheItem.controller
        cacheItem.promise = fetch(url, { signal })
            .then(response => {
                return response.blob()
            })
            .then(blob => URL.createObjectURL(blob))
            .catch(() => {
                if (cacheItem.refCount === 0) {
                    cacheItem.promise = undefined
                }
                return undefined
            })

        promiseCache[url] = cacheItem
    }

    return cacheItem
}

export const useImageLoader = (url: string| null) => {
    const [image, setImage] = useState<string | null | undefined>(null)

    useEffect(() => {
        if (!url || !isNil(image)) {
            return
        }

        let isCancelled = false
        const cacheItem = getUrl(url)
        const { promise, controller } = cacheItem

        promise!
            .then(r => !isCancelled ? setImage(r) : null)
            .catch(e => {
                console.log(e)
                return null
            })

        return () => {
            cacheItem.refCount--
            if (cacheItem.refCount === 0) {
                controller!.abort()
                isCancelled = true
            }
        }
    }, [url, image])

    return image
}