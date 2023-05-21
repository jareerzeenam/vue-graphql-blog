import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    setLoggedIn(isLoggedIn) {
      this.isLoggedIn = isLoggedIn;
    },
  },
  persist: true,
});
