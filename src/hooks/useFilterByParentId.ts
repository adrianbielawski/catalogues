import { useMemo } from 'react'

export interface DataWithParentId {
  parentId: number | null
}

export const useFilterByParentId = <D extends DataWithParentId>(
  data: D[],
  parentId: number | null,
) =>
  useMemo(() => {
    const matchedData: D[] = []
    const unMatchedData: D[] = []

    data.forEach((d) => {
      if (d.parentId === parentId) {
        matchedData.push(d)
      } else {
        unMatchedData.push(d)
      }
    })

    return [matchedData, unMatchedData]
  }, [data, parentId])
