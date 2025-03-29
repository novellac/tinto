import { defineConfig } from 'tinacms'

import { site } from './content-types/site'

// Your hosting provider likely exposes this as an environment variable
const branch
  = process.env.GITHUB_BRANCH
    || process.env.VERCEL_GIT_COMMIT_REF
    || process.env.HEAD
    || 'main'

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'assets/images',
      publicFolder: 'public',
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      site,
      {
        name: 'post',
        label: 'Posts',
        path: 'content/posts',
        format: 'mdx',
        ui: {
          router(args) {
            return `/posts/${args.document._sys.filename}`
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: true,
            // @ts-expect-error utc doesn't exist on the object but maybe should
            utc: true,
          },
          {
            type: 'object',
            list: true,
            name: 'blocks',
            label: 'Page blocks',
            templates: [
              {
                name: 'centeredProseBlock',
                label: 'Centered text section',
                fields: [
                  {
                    label: 'Heading',
                    name: 'heading',
                    type: 'string',
                    description: 'Make sure all the headings on the page are unique, since they are used for anchor links.',
                  },
                  {
                    label: 'WYSIWYG text',
                    name: 'richText',
                    type: 'rich-text',
                  },
                ],

              },
            ],
          },
          {
            type: 'string',
            name: 'snackList',
            label: 'Snack list',
            list: true,
          },
          {
            label: 'Rich text description',
            name: 'richText',
            type: 'rich-text',
            templates: [
              {
                name: 'callout',
                label: 'Callout Box',
                fields: [
                  {
                    name: 'text',
                    label: 'Text',
                    type: 'string',
                  },
                  {
                    name: 'type',
                    label: 'Type',
                    type: 'string',
                    options: ['info', 'warning', 'success'],
                  },
                ],
              },
              {
                name: 'currentDateTime',
                label: 'Date & Time',
                inline: true,
                fields: [
                  {
                    name: 'format',
                    label: 'Format',
                    type: 'string',
                    options: ['utc', 'iso', 'local'],
                  },
                ],
              },
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
            templates: [
              {
                name: 'callout',
                label: 'Callout Box',
                fields: [
                  {
                    name: 'text',
                    label: 'Text',
                    type: 'string',
                  },
                  {
                    name: 'type',
                    label: 'Type',
                    type: 'string',
                    options: ['info', 'warning', 'success'],
                  },
                ],
              },
              {
                name: 'currentDateTime',
                label: 'Date & Time',
                inline: true,
                fields: [
                  {
                    name: 'format',
                    label: 'Format',
                    type: 'string',
                    options: ['utc', 'iso', 'local'],
                  },
                ],
              },
            ],
          },
          {
            label: 'Related links',
            description: 'WARNING! You are responsible for ensuring that all links are valid!',
            name: 'linkItems',
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
              },
              {
                label: 'Link destination',
                name: 'href',
                type: 'string',
              },
            ],
          },
        ],
      },
    ],
  },
})
