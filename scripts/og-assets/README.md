# Local social cards

`scripts/og-images.cjs` is an independent Sharp renderer. It uses a small SVG
background, locally rendered text and the existing `juanfernandes-logo.svg`.
It does not fetch Cloudinary images or use Satori.

Both shared page layouts generate a 1200 × 630 PNG with the page title, logo,
and site domain. Tag pages use `Tag: <tag>`. Notes and stream entries inherit
the same card through their existing layout. `postImage` remains available
for other uses but no longer controls social cards.

To override a card, use an absolute HTTP(S) URL or a site-relative image path:

```yaml
ogImage: /assets/imgs/my-custom-card.jpg
ogImageAlt: Description of my custom card
```

Generated cards are written to the configured Eleventy output directory under
`assets/imgs/og/`. The content hash in the filename changes when the title,
domain, renderer, logo, font, or Sharp version changes. This also avoids keeping
old images in browser/CDN caches after a title or design edit.

The `_cache/og/` directory is already covered by the workflow's `_cache/`
restore/save steps. A cached PNG is copied into the output on each build;
generated PNGs and caches should not be committed. Clear `_cache/og/` to reclaim
obsolete cached cards. A render failure stops the build, preventing publication
of metadata pointing at a missing image.

Colours and spacing live in `scripts/og-images.cjs`: blue-grey `#393f4c`, orange
`#f89820`, and white type. DejaVu Sans Bold is bundled for predictable title
rendering across macOS and Linux; its redistribution notice is in `LICENSE.txt`.

Run the renderer and real-layout integration checks with `npm run test:og`.
