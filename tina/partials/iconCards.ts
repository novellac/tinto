import type { Template, TinaField } from 'tinacms'

import { baseHeadingWithIDWarning, imageFields, plainText } from './baseFields'

const iconCardsImage: TinaField = {
  label: 'Cards icon (same for all cards)',
  name: 'iconCardsIcon',
  type: 'object',
  fields: [...imageFields],
}

const iconCardsBase = {
  label: 'Icon Cards',
  fields: [
    iconCardsImage,
    baseHeadingWithIDWarning,
    plainText,
  ],
}

export const iconCardsBlock: Template = {
  name: 'iconCardsBlock',
  ...iconCardsBase,
}

export const iconCardsField: TinaField = {
  name: 'iconCardsField',
  type: 'object',
  ...iconCardsBase,
}
