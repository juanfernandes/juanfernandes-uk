export function streamFields () {
  return [
    {
      type: 'string',
      name: 'layout',
      label: 'Layout'
    },
    {
      type: 'image',
      name: 'postImage',
      label: 'Hero Image'
    },
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      required: true
    },
    {
      type: 'string',
      name: 'description',
      label: 'Description',
      required: true
    },
    {
      type: 'string',
      name: 'keywords',
      label: 'Keywords',
      list: true
    },
    {
      type: 'datetime',
      name: 'date',
      label: 'Date',
      required: true
    },
    {
      type: 'string',
      name: 'tags',
      label: 'Tags',
      list: true
    }
  ]
}
