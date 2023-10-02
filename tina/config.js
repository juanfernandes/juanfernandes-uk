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
        match: {
          include: '**/*'
        },
        fields: [
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body of Document',
            description: 'This is the markdown body',
            isBody: true
          }
        ]
      },
      {
        format: 'md',
        label: 'Blog',
        name: 'blog',
        path: 'src/blog',
        match: {
          include: '**/*'
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Document title',
            description: 'Main document title',
            isTitle: true,
            required: true
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body of Document',
            description: 'This is the markdown body',
            isBody: true
          }
        ]
      }
    ]
  }
})
