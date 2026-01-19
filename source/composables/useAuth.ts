import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { IUser } from '@/types/user'

export function useAuth() {
  const user = useStorage<IUser | null>('user-data', null)
  
  const isAuthenticated = computed(() => !!user.value)
  const userLevel = computed(() => user.value?.level || 1)
  const userXP = computed(() => user.value?.xp || 0)
  
  const login = async (email: string, password: string): Promise<IUser> => {

    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser: IUser = {
      id: '1',
      name: 'John Doe',
      email,
      level: 1,
      xp: 150,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    }
    
    user.value = mockUser
    return mockUser
  }
  
  const register = async (username: string, email: string, password: string): Promise<IUser> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser: IUser = {
      id: '2',
      name: username,
      email,
      level: 1,
      xp: 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
    }
    
    user.value = mockUser
    return mockUser
  }
  
  const logout = () => {
    user.value = null
  }
  
  const updateUser = (updates: Partial<IUser>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
    }
  }
  
  const addXP = (amount: number) => {
    if (user.value) {
      user.value.xp += amount
      
      const newLevel = Math.floor(user.value.xp / 1000) + 1
      if (newLevel > user.value.level) {
        user.value.level = newLevel
      }
    }
  }
  
  return {
    user,
    isAuthenticated,
    userLevel,
    userXP,
    login,
    register,
    logout,
    updateUser,
    addXP
  }
}