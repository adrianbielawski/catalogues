import { $CombinedState } from 'redux'
import { RootState } from 'store/storeConfig'

type Entity = Exclude<keyof RootState['entities'], typeof $CombinedState>

export const createEntitiesSelector =
  <E extends Entity>(entity: E) =>
  (state: RootState): RootState['entities'][E]['entities'] =>
    state.entities[entity].entities
