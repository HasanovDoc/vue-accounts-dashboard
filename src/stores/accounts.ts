import { defineStore } from 'pinia';
import { Account } from '@/types/account';

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: generateSimpleId(),
        label: [],
        type: 'Локальная',
        login: '',
        password: '',
      });
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter(acc => acc.id !== id);
    },
    updateAccount(updatedAccount: Account) {
      const index = this.accounts.findIndex(acc => acc.id === updatedAccount.id);
      if (index !== -1) this.accounts[index] = updatedAccount;
    },
  },
  persist: true,
});

function generateSimpleId() {
  return Math.random().toString(36).substring(2, 9);
}