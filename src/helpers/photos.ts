/* Photo d'une parcelle : redimensionnée puis envoyée sur Cloudinary (preset « unsigned »).
   Seule l'URL est stockée dans Firestore. Sans configuration, l'envoi de photo est désactivé. */
const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD as string | undefined
const PRESET = import.meta.env.VITE_CLOUDINARY_PRESET as string | undefined

export const cloudinaryEnabled = !!CLOUD && !!PRESET

const loadImage = (file: Blob): Promise<HTMLImageElement> => new Promise((res, rej) => {
  const url = URL.createObjectURL(file)
  const img = new Image()
  img.onload = () => { URL.revokeObjectURL(url); res(img) }
  img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('Image illisible')) }
  img.src = url
})

const resize = async (file: Blob, max: number, quality: number): Promise<Blob> => {
  const img = await loadImage(file)
  const k = Math.min(1, max / Math.max(img.width, img.height))
  const c = document.createElement('canvas')
  c.width = Math.round(img.width * k)
  c.height = Math.round(img.height * k)
  c.getContext('2d')?.drawImage(img, 0, 0, c.width, c.height)
  return new Promise((res, rej) => c.toBlob(b => (b ? res(b) : rej(new Error('Image illisible'))), 'image/jpeg', quality))
}

/** Redimensionne puis envoie la photo ; renvoie son URL. Lève une erreur si l'envoi échoue. */
export const uploadPhoto = async (file: File): Promise<string> => {
  if (!cloudinaryEnabled) throw new Error("L'envoi de photos n'est pas configuré.")
  if (!file.type.startsWith('image/')) throw new Error("Ce fichier n'est pas une image.")
  const fd = new FormData()
  fd.append('file', await resize(file, 1280, 0.8))
  fd.append('upload_preset', PRESET as string)
  const r = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: 'POST', body: fd })
  if (!r.ok) throw new Error(`Envoi de la photo impossible (${r.status}).`)
  const j = await r.json() as { secure_url?: string }
  if (!j.secure_url) throw new Error("Envoi de la photo impossible : réponse invalide.")
  return j.secure_url
}
