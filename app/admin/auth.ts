import { create } from 'zustand'

interface AdminAuth {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const ADMIN_CREDENTIALS = {
  username: 'LS04',
  password: 'P455WORD'
}

export const useAdminAuth = create<AdminAuth>((set) => ({
  isAuthenticated: false,
  login: (username: string, password: string) => {
    const isValid = 
      username === ADMIN_CREDENTIALS.username && 
      password === ADMIN_CREDENTIALS.password

    if (isValid) {
      set({ isAuthenticated: true })
      return true
    }
    return false
  },
  logout: () => set({ isAuthenticated: false })
})) 