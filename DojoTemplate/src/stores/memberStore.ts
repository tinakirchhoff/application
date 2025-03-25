import {defineStore} from 'pinia'
import memberNames from "../assets/json/members.json"
import {member} from "../types/member.ts";

export const useMemberStore = defineStore('memberStore', {
  state: () => ({
    members: undefined as member[],
    newMemberName: "",
    isInputOpen: false,
  }),

  actions: {
    checkIfMembersIsGiven() {
      if(sessionStorage.getItem('members')) {
        this.members = JSON.parse(sessionStorage.getItem('members'))
      } else {
        this.members = memberNames
      }
      return this.members
    },

    add() {
      if(!this.newMemberName) return undefined
      this.members.push({
        "id": this.members.slice(-1)[0].id + 1,
        "name": this.newMemberName,
        "variant": "default"
      })
      this.newMemberName = ""
      this.isInputOpen = false
    },

    remove(memberName: string) {
      const i = this.members.indexOf(memberName)
      this.members.splice(i, 1)
    },

    save() {
      sessionStorage.setItem('members', JSON.stringify(this.members));
    },

    reset() {
      this.members = memberNames
    },

    openInput() {
      this.isInputOpen = true
    }
  },
})
