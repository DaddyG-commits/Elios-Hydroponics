export type SessionUser = {
  id: string
  name: string
  email: string
  phone: string
  phoneCountry: 'CA'
  address: string
  city: string
  region: string
  postalCode: string
  country: 'CA'
  createdAt?: string
}

type LocalUser = SessionUser & {
  passwordHash: string
  resetToken?: string
  resetExpires?: number
}

const USERS_KEY = 'elios-users'
const SESSION_KEY = 'elios-user'

function id() {
  return `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}

async function hashPassword(password: string) {
  const data = new TextEncoder().encode(`${password}::elios-v1`)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function getUsers(): LocalUser[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveUsers(users: LocalUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getSession(): SessionUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SessionUser
  } catch {
    return null
  }
}

export function setSession(user: SessionUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

async function api<T>(path: string, body: unknown, method = 'POST'): Promise<T | null> {
  try {
    const res = await fetch(path, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function registerUser(input: {
  name: string
  email: string
  phone: string
  address: string
  city: string
  region: string
  postalCode: string
  password: string
}): Promise<{ ok: true; user: SessionUser } | { ok: false; error: string }> {
  const email = input.email.trim().toLowerCase()
  if (!email || input.password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' }
  }

  const remote = await api<{ ok: boolean; user?: SessionUser; error?: string }>('/api/account/register', {
    ...input,
    email,
    phoneCountry: 'CA',
    country: 'CA',
  })
  if (remote?.ok && remote.user) {
    setSession(remote.user)
    return { ok: true, user: remote.user }
  }
  if (remote && remote.ok === false && remote.error && !remote.error.includes('DATABASE') && !remote.error.includes('Could not')) {
    return { ok: false, error: remote.error }
  }

  const users = getUsers()
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: 'An account with this email already exists.' }
  }
  const passwordHash = await hashPassword(input.password)
  const user: LocalUser = {
    id: id(),
    name: input.name.trim(),
    email,
    phone: input.phone.trim(),
    phoneCountry: 'CA',
    address: input.address.trim(),
    city: input.city.trim(),
    region: input.region.trim(),
    postalCode: input.postalCode.trim(),
    country: 'CA',
    passwordHash,
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  saveUsers(users)
  const { passwordHash: _p, resetToken: _t, resetExpires: _e, ...session } = user
  setSession(session)
  return { ok: true, user: session }
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ ok: true; user: SessionUser } | { ok: false; error: string }> {
  const remote = await api<{ ok: boolean; user?: SessionUser; error?: string }>('/api/account/login', {
    email,
    password,
  })
  if (remote?.ok && remote.user) {
    setSession(remote.user)
    return { ok: true, user: remote.user }
  }

  const users = getUsers()
  const found = users.find((u) => u.email === email.trim().toLowerCase())
  if (!found) return { ok: false, error: remote?.error || 'Invalid email or password.' }
  const hash = await hashPassword(password)
  if (hash !== found.passwordHash) return { ok: false, error: 'Invalid email or password.' }
  const { passwordHash: _p, resetToken: _t, resetExpires: _e, ...session } = found
  setSession(session)
  return { ok: true, user: session }
}

export async function updateUser(
  userId: string,
  patch: Partial<
    Pick<
      SessionUser,
      'name' | 'email' | 'phone' | 'address' | 'city' | 'region' | 'postalCode'
    >
  > & { password?: string }
): Promise<{ ok: true; user: SessionUser } | { ok: false; error: string }> {
  const remote = await api<{ ok: boolean; user?: SessionUser; error?: string }>(
    '/api/account/profile',
    { id: userId, ...patch },
    'PATCH'
  )
  if (remote?.ok && remote.user) {
    setSession(remote.user)
    return { ok: true, user: remote.user }
  }
  if (remote && remote.ok === false && remote.error && !String(remote.error).includes('Could not')) {
    return { ok: false, error: remote.error }
  }

  const users = getUsers()
  const idx = users.findIndex((u) => u.id === userId)
  if (idx < 0) return { ok: false, error: 'User not found. Please sign in again.' }

  if (patch.email) {
    const email = patch.email.trim().toLowerCase()
    if (users.some((u, i) => i !== idx && u.email === email)) {
      return { ok: false, error: 'That email is already in use.' }
    }
    users[idx].email = email
  }
  if (patch.name != null) users[idx].name = patch.name.trim()
  if (patch.phone != null) users[idx].phone = patch.phone.trim()
  if (patch.address != null) users[idx].address = patch.address.trim()
  if (patch.city != null) users[idx].city = patch.city.trim()
  if (patch.region != null) users[idx].region = patch.region.trim()
  if (patch.postalCode != null) users[idx].postalCode = patch.postalCode.trim()
  if (patch.password) {
    if (patch.password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' }
    users[idx].passwordHash = await hashPassword(patch.password)
  }

  saveUsers(users)
  const { passwordHash: _p, resetToken: _t, resetExpires: _e, ...session } = users[idx]
  setSession(session)
  return { ok: true, user: session }
}

export async function requestPasswordReset(
  email: string
): Promise<{ ok: true; token?: string } | { ok: false; error: string }> {
  const remote = await api<{ ok: boolean; token?: string; error?: string }>('/api/account/forgot', { email })
  if (remote?.ok) return { ok: true, token: remote.token }

  const users = getUsers()
  const idx = users.findIndex((u) => u.email === email.trim().toLowerCase())
  if (idx < 0) return { ok: true }
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36)
  users[idx].resetToken = token
  users[idx].resetExpires = Date.now() + 1000 * 60 * 60
  saveUsers(users)
  return { ok: true, token }
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (newPassword.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' }

  const remote = await api<{ ok: boolean; error?: string }>('/api/account/reset', {
    token,
    password: newPassword,
  })
  if (remote?.ok) return { ok: true }
  if (remote?.error) return { ok: false, error: remote.error }

  const users = getUsers()
  const idx = users.findIndex(
    (u) => u.resetToken === token && u.resetExpires && u.resetExpires > Date.now()
  )
  if (idx < 0) return { ok: false, error: 'Reset link is invalid or has expired.' }
  users[idx].passwordHash = await hashPassword(newPassword)
  users[idx].resetToken = undefined
  users[idx].resetExpires = undefined
  saveUsers(users)
  return { ok: true }
}
