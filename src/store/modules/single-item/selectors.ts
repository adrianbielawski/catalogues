import {
  AuthUserChoiceData,
  AuthUserChoiceFieldData,
  AuthUserFieldData,
  DeserializedCommentData,
} from 'src/globalTypes'
import { SingleItemSliceState } from './types'

type State = SingleItemSliceState

export const getFieldDataById = (
  state: SingleItemSliceState,
  fieldId: number,
): AuthUserFieldData =>
  state.catalogueData!.fieldsData.filter((f) => f.id === fieldId)[0]

export const getChoiceDataById = (
  state: SingleItemSliceState,
  fieldId: number,
  choiceId: number,
): AuthUserChoiceData =>
  (getFieldDataById(state, fieldId) as AuthUserChoiceFieldData).choices.filter(
    (c) => c.id === choiceId,
  )[0]

export const getItemCommentDataById = (
  state: State,
  commentId: number,
): DeserializedCommentData =>
  state.itemData!.commentsData.results.filter((c) => c.id === commentId)[0]
