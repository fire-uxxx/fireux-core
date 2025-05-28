// Proxy endpoint to fetch an external Google image and upload it to Firebase Storage
import { defineEventHandler, getQuery, createError } from 'h3'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default defineEventHandler(async event => {
  const { photo_url, storagePath } = getQuery(event)

  if (!photo_url || !storagePath) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Missing required query parameters: "photo_url" and "storagePath".'
    })
  }

  try {
    console.log('[Google Photo Proxy] Fetching image from:', photo_url)

    const response = await fetch(photo_url, { redirect: 'follow' })

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `Failed to fetch image: ${response.statusText}`
      })
    }

    const contentType = response.headers.get('Content-Type') || 'image/jpeg'

    if (!contentType.startsWith('image/')) {
      throw createError({
        statusCode: 415,
        statusMessage: 'Fetched content is not an image.'
      })
    }

    const imageBuffer = await response.arrayBuffer()

    const storage = getStorage()
    const storageRef = ref(storage, storagePath)

    await uploadBytes(storageRef, Buffer.from(imageBuffer), { contentType })

    const firebaseUrl = await getDownloadURL(storageRef)

    console.log('[Google Photo Proxy] Uploaded successfully:', firebaseUrl)

    return { firebaseUrl }
  } catch (error) {
    console.error('[Google Photo Proxy Error]', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal error processing Google image.'
    })
  }
})
