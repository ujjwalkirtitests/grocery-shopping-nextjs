import { IProduct } from '@/types'
import { createStore } from 'zustand/vanilla'

export type CounterState = {
    items: IProduct[]
}

export type CounterActions = {
    addToCart: (product: IProduct) => void
    removeFromCart: (productId: string) => void
    totalItemsInCart: () => number
    totalItemsInCartBasedOnId: (productId: string) => number
    clearCart: () => void
}

export type CounterStore = CounterState & CounterActions

export const defaultInitState: CounterState = {
    items: [],
}

export const createCounterStore = (
    initState: CounterState = defaultInitState,
) => {
    return createStore<CounterStore>()((set) => ({
        ...initState,
        addToCart: (product: IProduct) => set((state) => ({ items: [...state.items, product] })),
        removeFromCart: (productId) => set((state) => {
            const i = state.items.findIndex((product: IProduct) => product._id === productId);
            return { items: state.items.filter((product: IProduct, index: number) => index != i) }
        }),
        totalItemsInCart: () => initState.items.length,
        totalItemsInCartBasedOnId: (productId) => initState.items.filter((product: IProduct) => product._id === productId).length,
        clearCart: () => set({ items: [] }),
    }))

};
