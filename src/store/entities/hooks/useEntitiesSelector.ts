import { Entity, useTypedSelector } from 'store/storeConfig'
import { createEntitiesSelector } from '../selectors'

const useEntitiesSelector = <E extends Entity>(entity: E) => {
  const value = useTypedSelector(createEntitiesSelector(entity))
  return value
}

export default useEntitiesSelector
