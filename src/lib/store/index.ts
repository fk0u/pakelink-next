import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definisi Role - Hanya siswa karena aplikasi single user
export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER'
}

// Interface User
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
}

// Default user untuk akses langsung tanpa login
const defaultUser: User = {
  id: 'student-1',
  name: 'Rizki Mahasiswa',
  email: 'rizki@example.com',
  role: UserRole.STUDENT,
};

// Interface Auth State
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  initDefaultUser: () => void;
}

// Auth Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (userData) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        })),
      initDefaultUser: () => set({ user: defaultUser, isAuthenticated: true })
    }),
    {
      name: 'pakelink-auth'
    }
  )
);

// Interface UI State
interface UIState {
  sidebarOpen: boolean;
  isDarkMode: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

// UI Store
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      isDarkMode: false,
      theme: 'system',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'pakelink-ui'
    }
  )
);
