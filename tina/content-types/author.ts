import type { Collection } from 'tinacms'

import { ContentType } from '~/types'
import { metadataNoDate } from '../partials/baseFields'
import { dividerField } from '../partials/divider'
import { heroField } from '../partials/hero'
import { pageSections } from '../partials/pageSections'

export const author: Collection = {
  label: 'Authors',
  name: ContentType.AUTHOR,
  path: 'content/authors',
  format: 'mdx',
  ui: {
    router(args) {
      return `/authors/${args.document._sys.filename}`
    },
  },
  fields: [
    ...metadataNoDate,
    heroField,
    dividerField,
    pageSections,
  ],
}
