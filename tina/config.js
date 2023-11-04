import { defineConfig } from 'tinacms'
import { streamFields } from './templates'

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'

export default defineConfig({
  branch,
  clientId: process.env.TINACMS_CLIENT_ID,
  token: process.env.TINACMS_TOKEN_ID,
  client: { skip: true },
  build: {
    outputFolder: 'admin',
    publicFolder: 'dist'
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },
  schema: {
    collections: [
      {
        format: 'md',
        label: 'Stream',
        name: 'stream',
        path: 'src/stream',
        defaultItem: () => {
          return {
            layout: 'stream',
            image: 'v1579162295/trianglify.png'
          }
        },
        match: {
          include: '**/*'
        },
        fields: [
          {
            type: 'string',
            name: 'layout',
            label: 'Layout',
            options: [
              {
                value: 'base',
                label: 'Base',
              },
              {
                value: 'page',
                label: 'Page',
              },
              {
                value: 'image',
                label: 'Image',
              },
              {
                value: 'stream',
                label: 'Stream',
              },
              {
                value: 'post',
                label: 'Post',
              },
            ],
          },
          {
            label: "Date",
            name: "date",
            type: "datetime",
            ui: {
              dateFormat: 'YYYY-MM-DD',
              timeFormat: "HH:mm"
            },
          },
          {
            name: 'keywords',
            label: 'Keywords',
            type: 'string',
            list: true
          },
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true
          },
          {
            name: 'description',
            label: 'Description',
            type: 'string',
            ui: {
              component: 'textarea',
            }
          },
          {
            type: 'image',
            label: 'Image',
            name: 'postImage'
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true
          },
          {
            name: 'tags',
            label: 'Tags',
            type: 'string',
            list: true
          }
        ]
      },
      {
        format: 'md',
        label: 'Blog',
        name: 'blog',
        path: 'src/blog',
        defaultItem: () => {
          return {
            layout: 'post'
          }
        },
        match: {
          include: '**/*'
        },
        fields: [
          {
            type: 'string',
            name: 'layout',
            label: 'Layout',
            options: [
              {
                value: 'base',
                label: 'Base',
              },
              {
                value: 'page',
                label: 'Page',
              },
              {
                value: 'image',
                label: 'Image',
              },
              {
                value: 'stream',
                label: 'Stream',
              },
              {
                value: 'post',
                label: 'Post',
              },
            ],
          },
          {
            label: "Date",
            name: "date",
            type: "datetime",
            ui: {
              dateFormat: 'YYYY-MM-DD',
              timeFormat: "HH:mm"
            },
          },
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true
          },
          {
            name: 'description',
            label: 'Description',
            type: 'string',
            ui: {
              component: 'textarea',
            }
          },
          {
            name: 'keywords',
            label: 'Keywords',
            type: 'string',
            list: true
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true
          },
          {
            name: 'tags',
            label: 'Tags',
            type: 'string',
            list: true
          }
        ]
      }
    ]
  }
})
