import { create } from 'zustand'

export const useStore = create((set) => ({
  responseMessage: {
    message: '',
    type: ''
  },
  setResponseMessage: (res) => {
    set({ responseMessage: res });

    setTimeout(() => {
      set({ responseMessage: { message: '', type: '' } })
    }, 6000)  

  },
}));

export const useAccessStore = create((set) => ({
  accessToken: null,
  accessIsValid: true,
  setAccessToken: (data) => set({ accessToken: data }),
  setAccessIsValid: (bool) => set({ accessIsValid: bool })
}))

export const useCollectionsStore = create((set) => ({
  collections: [],
  setCollections: (data) => set({ collections: data }),

  displayAddToCollections: false,
  setDisplayAddToCollections: (data) => set({ displayAddToCollections: data})
}))

export const useAuthStore = create((set) => ({
  displayAuthMessage: false,
  setDisplayAuthMessage: (bool) => set({ displayAuthMessage: bool})
}))