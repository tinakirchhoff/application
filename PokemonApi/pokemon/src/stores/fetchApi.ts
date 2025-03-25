import {defineStore} from 'pinia'

export const useApiStore = defineStore('useApi', {
    state: () => ({
        item: undefined as Ability | Move | undefined,
        hasError: false,
        savedItems: {},
    }),

    actions: {
        async fetch(url: string) {
            if (!this.savedItems.hasOwnProperty(url)) {
                try {
                    let response: Response = await fetch(url)
                    this.item = await response.json()
                    this.hasError = false
                    this.savedItems[url] = this.item
                } catch (error) {
                    this.hasError = true
                }
            }
            return this.savedItems[url]
        }
    }
})
