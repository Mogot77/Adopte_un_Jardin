/* Rôles des comptes de la liste blanche. À étendre selon les besoins métier. */
export type Role = 'admin' | 'membre'

export const ROLES: Role[] = ['admin', 'membre']

/** Rôle inconnu ou absent → `membre` (le moins privilégié). */
export const normRole = (v: unknown): Role => (v === 'admin' ? 'admin' : 'membre')
