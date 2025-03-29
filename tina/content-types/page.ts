import type { Collection } from 'tinacms'

import { metadataNoDate } from '../partials/baseFields'
import { dividerField } from '../partials/divider'
import { heroField } from '../partials/hero'
import { pageSections } from '../partials/pageSections'

export const page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content',
  format: 'mdx',
  ui: {
    router(args) {
      return `/posts/${args.document._sys.filename}`
    },
  },
  match: {
    exclude: 'posts/**/**',
  },
  fields: [
    ...metadataNoDate,
    heroField,
    dividerField,
    pageSections,
  ],
}
