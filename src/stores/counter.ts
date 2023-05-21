import { defineStore } from "pinia";

// This is an example for testing pinia (State management)

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { 
      count: 0
     };
  },
  actions: {
    increment(value = 1) {
      this.count += value;
    },
    decrement(value = 1) {
      this.count -= value;
    },
    reset() {
      this.count = 0;
    }
  },
  getters: {
    doubleCount: (state) => {
      return state.count * 2;
    },
    squareCount: (state) => {
      return state.count ** 2;
    },
  },
  persist: true,
});