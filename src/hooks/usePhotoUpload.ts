import { useState } from 'react'
import { useApp } from '@/hooks/useApp'
import { MAX_PHOTOS, uploadPhoto } from '@/helpers/photos'

/** Envoi de plusieurs photos (Cloudinary) vers une liste d'URL tenue par le formulaire. `update` reçoit une fonction qui transforme la liste courante. */
export const usePhotoUpload = (urls: string[], update: (change: (prev: string[]) => string[]) => void) => {
  const { toast } = useApp()
  const [uploading, setUploading] = useState(false)

  const add = (files: File[]) => {
    const room = Math.max(0, MAX_PHOTOS - urls.length)
    if (files.length > room) toast(`Maximum ${MAX_PHOTOS} photos : les suivantes sont ignorées.`, 'error')
    setUploading(true)
    Promise.allSettled(files.slice(0, room).map(uploadPhoto))
      .then(results => {
        const added = results.flatMap(r => (r.status === 'fulfilled' ? [r.value] : []))
        const failed = results.find(r => r.status === 'rejected')
        if (added.length > 0) update(prev => [...prev, ...added].slice(0, MAX_PHOTOS))
        if (failed && failed.status === 'rejected') toast(failed.reason instanceof Error ? failed.reason.message : "Envoi d'une photo impossible.", 'error')
      })
      .finally(() => setUploading(false))
  }

  const remove = (index: number) => update(prev => prev.filter((_, i) => i !== index))

  return { uploading, add, remove }
}
