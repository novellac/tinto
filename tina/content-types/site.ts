import type { Collection } from 'tinacms'
import { ContentType } from '~/types'

export const site: Collection = {
  label: 'Site information',
  name: ContentType.SITE,
  path: 'content/site',
  format: 'json',
  ui: {
    // We only want one page of this content type, so disallow editors from creating/deleting pages.
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      label: 'Site name',
      name: 'siteName',
      type: 'string',
      required: true,
    },
    {
      label: 'Footer WYSIWYG text',
      name: 'footerText',
      type: 'rich-text',
    },
    {
      label: 'Copyright',
      description: 'Add the copyright text without the year, which will be generated automatically.',
      name: 'siteCopyright',
      type: 'string',
    },
    {
      label: 'Nav links',
      description: 'WARNING! You are responsible for ensuring that all links are valid!',
      name: 'navItems',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item: Record<string, string>) => {
          // Field values are accessed by item?.<Field name>
          return { label: item?.linkText }
        },
      },
      fields: [
        {
          label: 'Link text',
          name: 'linkText',
          type: 'string',
          required: true,
        },
        {
          label: 'Link destination',
          name: 'href',
          type: 'string',
          required: true,
        },
      ],
    },
  ],
}
