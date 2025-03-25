import {defineStore} from "pinia";
import {useMemberStore} from "./memberStore.ts";
import {useTimerStore} from "./timerStore.ts";

export const useFormStore = defineStore('formStore', {
  state: () => ({
    isModalOpen: false,
    isComponentFormOpen: false,
    copyWasSuccessful: false,
    memberStore: useMemberStore(),
    timerStore: useTimerStore()
  }),

  actions: {
    setValuesAndReload() {
      this.timerStore.save()
      this.memberStore.save()
      window.location.reload()
      this.isModalOpen = false
    },

    showComponentForm() {
      this.isComponentFormOpen = true
    },

    validateId(id: string) {
      return id.replace(/(?:^\w|[A-Z]|\b\w)/g,
        function (word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    },

    validateDifficulty(difficulty: string) {
      difficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
      if (!difficulty.includes('Ausbildungsjahr')) {
        difficulty += " Ausbildungsjahr"
      }
      return difficulty
    },

    async copy(value: string) {
      try {
        await navigator.clipboard.writeText(value);
        this.copyWasSuccessful = true
      } catch (err) {
        this.copyWasSuccessful = false
      }
    }
  }
})
