<template>
  <div class="account-list">
    <div class="account-title">
      <h1>Учётные записи</h1>
      <button @click="addAndFocus">+</button>
    </div>
    <div v-for="account in accounts" :key="account.id">
      <AccountForm 
        ref="accountForms"
        :account="account" 
        @update="updateAccount" 
        @delete="deleteAccount(account.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAccountsStore } from '@/stores/accounts';
import AccountForm from './AccountForm.vue';
import { nextTick, ref } from 'vue';

const store = useAccountsStore();
const { accounts } = storeToRefs(store);
const { addAccount, deleteAccount, updateAccount } = store;

const accountForms = ref<InstanceType<typeof AccountForm>[]>([]);

const addAndFocus = async () => {
  addAccount();
  await nextTick();
  // Фокус на последнем AccountForm
  const lastForm = accountForms.value[accountForms.value.length - 1];
  lastForm?.focusFirstInput();
};
</script>

<style scoped lang="scss">
.account-list {
  width: 100vw;
  height: 100vh;
}

.account-title {
  display: flex;
}
</style>