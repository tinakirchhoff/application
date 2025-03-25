import {defineStore} from 'pinia'
import {useStateStore} from "./statesStore.ts";

export const useTimerStore = defineStore('timerStore', {
  state: () => ({
    stopClick: false,
    isTimeOver: false,
    time: "06:00",
    minutes: Number(sessionStorage.getItem("minutes")),
    seconds: Number(sessionStorage.getItem("seconds")),
    calcTimeInSeconds: 0,
    timeInSeconds: 0,
    timerInterval: 0,
    newMin: 0,
    newSec: 0,
    stateStore: useStateStore()
  }),

  actions: {
    setTime() {
      this.checkIfTimeIsGiven()
      this.time = this.formatTime(this.minutes, this.seconds)
      this.calcTimeInSeconds = this.minutes * 60 + this.seconds
      this.timeInSeconds = this.calcTimeInSeconds
    },

    start() {
      if (!this.stopClick) {
        this.setTime()
        this.stateStore.start()
      }
      this.stopClick = false
      this.isTimeOver = false
      this.timerInterval = setInterval(this.timer, 1000)
    },

    stop() {
      this.stopClick = true
      this.stopInterval()
    },

    reset() {
      this.checkIfTimeIsGiven()
      this.time = this.formatTime(this.minutes, this.seconds)
      this.stopInterval();
    },

    skip() {
      this.isTimeOver = true
      this.reset()
      this.stateStore.start()
    },

    timer() {
      this.timeInSeconds--
      this.minutes = Math.floor(this.timeInSeconds / 60);
      this.seconds = this.timeInSeconds - this.minutes * 60;
      if (this.timeInSeconds === 0) {
        this.stopInterval()
        this.reset()
        this.isTimeOver = true
      }
      this.time = this.formatTime(this.minutes, this.seconds)
    },

    formatTime(minutes, seconds) {
      if (minutes < 10) {
        minutes = "0" + minutes
      }
      if (seconds < 10) {
        seconds = "0" + seconds
      }
      return minutes + ":" + seconds
    },

    checkIfTimeIsGiven() {
      if (Number(sessionStorage.getItem("minutes"))) {
        this.minutes = Number(sessionStorage.getItem("minutes"))
        this.seconds = Number(sessionStorage.getItem("seconds"))
      } else {
        this.minutes = 6
        this.seconds = 0
      }
    },

    stopInterval() {
      clearInterval(this.timerInterval)
    },

    save() {
      if (!this.newMin) {
        this.newMin = 0
      }
      if (!this.newSec) {
        this.newSec = 0
      }
      sessionStorage.setItem("minutes", this.newMin)
      sessionStorage.setItem("seconds", this.newSec)
    }
  },
})
