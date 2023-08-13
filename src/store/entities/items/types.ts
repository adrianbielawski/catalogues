import { type NewImage } from 'components/main/catalogues/catalogue/catalogue-item/edit-item/add-image/addImage'

export interface ItemUpdated {
  id: number
  changes: any
}

export interface AddImagesToStatePayload {
  itemId: number
  images: NewImage[]
}

export interface ImagePayload {
  itemId: number
  index: number
}
