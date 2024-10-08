import { create } from 'zustand'

interface RegisterState {
  email: string
  password: string
  dob: Date | null
  postcode: string
  address: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setDob: (dob: Date | null) => void
  setPostcode: (dob: string) => void
  setAddress: (address: string) => void
  resetForm: () => void
}

const useRegisterStore = create<RegisterState>((set) => ({
  email: '',
  password: '',
  dob: null,
  postcode: '',
  address: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setDob: (dob) => set({ dob }),
  setPostcode: (postcode) => set({ postcode }),
  setAddress: (address) => set({ address }),
  resetForm: () =>
    set({
      email: '',
      password: '',
      dob: null,
      postcode: '',
      address: '',
    }),
}))

export default useRegisterStore
