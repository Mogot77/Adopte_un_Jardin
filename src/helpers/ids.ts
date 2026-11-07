/* Identifiants : réservation et code de validation. */

/** Identifiant déterministe d'une réservation : retrouvable par les règles Firestore à partir de la parcelle et du jardinier. */
export const reservationId = (parcelId: string, gardenerEmail: string): string => `${parcelId}__${gardenerEmail.toLowerCase()}`

/** Code à 6 chiffres remis au jardinier, à donner au propriétaire après la première rencontre. */
export const newCode = (): string => {
  const buf = new Uint32Array(1)
  crypto.getRandomValues(buf)
  return String(buf[0] % 1_000_000).padStart(6, '0')
}
