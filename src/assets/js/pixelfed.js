// pixelfed.js
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import FormData from 'form-data';

/**
 * Uploads an image to Pixelfed and returns the media id.
 * @param {string} filePath - absolute or relative path to the image file
 * @param {string} [altText] - accessibility description
 */
export async function uploadMedia(filePath, altText = '') {
  const baseUrl = process.env.PIXELFED_BASE_URL;
  const token = process.env.PIXELFED_ACCESS_TOKEN;
  if (!baseUrl || !token) throw new Error('Missing PIXELFED_BASE_URL or PIXELFED_ACCESS_TOKEN');

  const form = new FormData();
  form.append('file', fs.createReadStream(path.resolve(filePath)));
  if (altText) form.append('description', altText); // Mastodon-compatible param supported by Pixelfed

  const res = await axios.post(`${baseUrl}/api/v1/media`, form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${token}`,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });

  return res.data.id; // media ID
}

/**
 * Creates a Pixelfed post with attached media.
 * @param {object} options
 * @param {string} options.status - caption text
 * @param {string[]} options.mediaIds - array of media ids from uploadMedia()
 * @param {'public'|'unlisted'|'private'|'direct'} [options.visibility='public']
 * @param {string[]} [options.tags] - optional tags (we’ll append to caption)
 */
export async function createStatus({ status, mediaIds, visibility = 'public', tags = [] }) {
  const baseUrl = process.env.PIXELFED_BASE_URL;
  const token = process.env.PIXELFED_ACCESS_TOKEN;
  if (!baseUrl || !token) throw new Error('Missing PIXELFED_BASE_URL or PIXELFED_ACCESS_TOKEN');
  if (!mediaIds?.length) throw new Error('createStatus: mediaIds is empty');

  const caption =
    status +
    (tags?.length ? `\n\n${tags.map(t => (t.startsWith('#') ? t : `#${t}`)).join(' ')}` : '');

  const res = await axios.post(
    `${baseUrl}/api/v1/statuses`,
    {
      status: caption,
      visibility,
      media_ids: mediaIds,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data; // full status object
}

/**
 * Convenience: one call to upload then post.
 */
export async function postPhotoToPixelfed({ filePath, altText = '', caption = '', tags = [], visibility = 'public' }) {
  const mediaId = await uploadMedia(filePath, altText);
  const post = await createStatus({ status: caption, mediaIds: [mediaId], visibility, tags });
  return post;
}
