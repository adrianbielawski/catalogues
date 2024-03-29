import { combineReducers } from '@reduxjs/toolkit'
import { usersEntitiesSlice } from './users/slice'
import { fieldsEntitiesSlice } from './fields/slice'
import { cataloguesEntitiesSlice } from './catalogues/slice'
import { choicesEntitiesSlice } from './choices/slice'
import { itemsEntitiesSlice } from './items/slice'
import { itemsCommentsEntitiesSlice } from './items-comments/slice'

export const entities = combineReducers({
  users: usersEntitiesSlice.reducer,
  catalogues: cataloguesEntitiesSlice.reducer,
  fields: fieldsEntitiesSlice.reducer,
  choices: choicesEntitiesSlice.reducer,
  items: itemsEntitiesSlice.reducer,
  itemsComments: itemsCommentsEntitiesSlice.reducer,
})
