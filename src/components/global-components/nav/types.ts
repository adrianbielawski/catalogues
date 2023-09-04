import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { ReactNode } from 'react'

export interface CommonItem {
  id: string | number
  title: string
}

export type ItemWithOnClickAndIcon = CommonItem & {
  icon: ReactNode
  faIcon?: never
  onClick?: () => void
}

export type ItemWithOnClickAndFaIcon = CommonItem & {
  icon?: never
  faIcon: IconDefinition
  onClick?: () => void
}

export type ItemWithOnClick = ItemWithOnClickAndIcon | ItemWithOnClickAndFaIcon

export type ItemWithUrlAndIcon = CommonItem & {
  icon: ReactNode
  faIcon?: never
  url: string
  children?: never
  onClick?: never
}

export type ItemWithUrlAndFaIcon = CommonItem & {
  icon?: never
  faIcon: IconDefinition
  url: string
  children?: never
  onClick?: never
}

export type ItemWithUrl = ItemWithUrlAndIcon | ItemWithUrlAndFaIcon

export type ItemWithChildrenAndIcon = CommonItem & {
  icon: ReactNode
  faIcon?: never
  url?: never
  children: ItemType[]
}

export type ItemWithChildrenAndFaIcon = CommonItem & {
  icon?: never
  faIcon: IconDefinition
  url?: never
  children: ItemType[]
}

export type ItemWithChildren =
  | ItemWithChildrenAndIcon
  | ItemWithChildrenAndFaIcon

export type ItemType = ItemWithUrl | ItemWithChildren | ItemWithOnClick
