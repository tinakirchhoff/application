import {defineStore} from 'pinia'
import {useMemberStore} from "./memberStore.ts";
import {Member} from "../types/member.ts";

export const useStateStore = defineStore('stateStore', {
  state: () => ({
    availableIds: [],
    memberStore: useMemberStore(),
    firstId : undefined,
    nextId : undefined
  }),

  actions: {
    start() {
      if(!this.firstId) {
        this.availableIds = []
        this.memberStore.members.forEach((member: Member) => {
          this.availableIds.push(member.id)
          member.variant = 'default'
        })
        this.firstId = Math.floor(Math.random() * this.availableIds.length)
        this.nextId = this.availableIds[this.firstId]
      }
      this.startsValidation(this.nextId)
    },

    startsValidation(index: number) {
      this.removeFromAvailableIds(index)
      this.calcNextId()
      if (this.availableIds.length) {
        this.validatesStatesSecondaryTertiary()
      } else {
        this.validateStateTertiary()
        this.resetAvailableIds()
        this.removeFromAvailableIds(index)
        this.calcNextId()
        this.setState(this.nextId, "secondary")
      }
      this.setState(index, "primary")
    },

    validatesStatesSecondaryTertiary() {
      this.validateStateTertiary()
      this.setState(this.nextId, "secondary")
    },

    validateStateTertiary() {
      this.memberStore.members.forEach((member: Member) => {
          if (!this.availableIds.includes(member.id)) {
            this.setState(member.id, "tertiary")
          }
        }
      )
    },

    calcNextId() {
      const randomId = Math.floor(Math.random() * this.availableIds.length)
      this.nextId = this.availableIds[randomId]
    },

    removeFromAvailableIds(id: number) {
      this.availableIds.forEach((availableId: number) => {
          if (availableId === id) {
            this.availableIds.splice(this.availableIds.indexOf(id), 1)
          }
        }
      )
    },

    resetAvailableIds() {
      this.availableIds = []
      this.memberStore.members.forEach((member : Member) => {
        this.availableIds.push(member.id)
        member.variant = 'default'
      })
    },

    setState(index: number, state: string) {
      this.memberStore.members.forEach((member: Member) => {
        if (member.id === index) {
          member.variant = `c-chip--${state}`
        }
      })
    }
  }
})
