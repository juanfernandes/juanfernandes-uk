const mastodonPostTemplate = document.createElement('template')

mastodonPostTemplate.innerHTML = ``

mastodonPostTemplate.id = 'mastodon-post-template'

if (!document.getElementById(mastodonPostTemplate.id)) {
  document.body.appendChild(mastodonPostTemplate)
}

class MastodonPost extends HTMLElement {
  static register (tagName) {
    if ('customElements' in window) {
      customElements.define(tagName || 'mastodon-post', MastodonPost)
    }
  }

  async connectedCallback () {
    this.append(this.template)

    const data = { ...(await this.data), ...this.linkData }

    this.querySelectorAll('[data-key]').forEach(async (slot) => {
      const { key } = slot.dataset
      const value = data[key]

      if (key === 'content') {
        slot.innerHTML = value
      } else if (typeof value === 'string' && value.startsWith('http')) {
        if (slot.localName === 'a') slot.href = value
        if (slot.localName === 'img') slot.src = value
      } else {
        slot.textContent = value
      }
    })
  }

  get template () {
    return document
      .getElementById(mastodonPostTemplate.id)
      .content.cloneNode(true)
  }

  get link () {
    return this.querySelector('a').href
  }

  get linkData () {
    const url = new URL(this.link)
    const paths = url.pathname.split('/').filter((string) => string.length)
    return {
      url: this.link,
      hostname: url.hostname,
      username: paths.find((path) => path.startsWith('@')),
      postId: paths.find((path) => !path.startsWith('@'))
    }
  }

  get endpoint () {
    return `https://${this.linkData.hostname}/api/v1/statuses/${this.linkData.postId}`
  }

  get data () {
    return fetch(this.endpoint).then((response) => response.json())
  }
}

MastodonPost.register()
