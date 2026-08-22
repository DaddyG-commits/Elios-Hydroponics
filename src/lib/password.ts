import { createHash } from 'crypto'

export function hashPassword(password: string) {
  return createHash('sha256').update(`${password}::elios-v1`).digest('hex')
}

export function publicUser(user: {
  id: string
  name: string | null
  email: string
  phone: string | null
  phoneCountry: string | null
  address: string | null
  city: string | null
  region: string | null
  postalCode: string | null
  country: string | null
  createdAt: Date
}) {
  return {
    id: user.id,
    name: user.name || '',
    email: user.email,
    phone: user.phone || '',
    phoneCountry: 'CA' as const,
    address: user.address || '',
    city: user.city || '',
    region: user.region || '',
    postalCode: user.postalCode || '',
    country: 'CA' as const,
    createdAt: user.createdAt.toISOString(),
  }
}
