import { create } from 'zustand'
import { TActions, TMessage, TState } from './useProducts.interface'

const initialState: TState = {
  message: {title: '', description: '', type:'success'},
}

export const useToastMessage = create<TState & TActions>()(set => ({
  ...initialState,
  setMessage: (message: TMessage ) => set({ message: message }),
}))