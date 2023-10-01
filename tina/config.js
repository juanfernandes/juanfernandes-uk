import { defineConfig } from 'tinacms'
import { streamFields } from './templates'

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'

export default defineConfig({
  branch,
  clientId: 'c39a17df-455f-4401-a510-2e2008a262b6',
  token: '26cab59bb9bd54e3e4074c5c472ef5737e66ace2',
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
