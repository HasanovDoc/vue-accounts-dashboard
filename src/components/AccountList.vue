<template>
  <div class="account-list-container">
    <div class="account-title">
      <h1>Учётные записи</h1>
      <button @click="addAndFocus" class="add-btn"></button>
    </div>
    <div class="account-hint">Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</div>
    <div class="account-list">
      <div v-for="account in accounts" :key="account.id" class="list_item">
        <AccountForm 
          ref="accountForms"
          :account="account" 
          @update="updateAccount" 
          @delete="deleteAccount(account.id)"
        />
      </div>
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
.account-list-container {
  width: 100vw;
  height: 100vh;
  padding: 10px;
}

.account-title {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.add-btn {
  background: linear-gradient(90deg, #3a3f47 0%, #23272a 100%);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-weight: bold;
  line-height: 1;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;

  &::after {
    content: '';
    display: block;
    width: 22px;
    height: 22px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: none;
  }

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 16px;
    height: 3px;
    background: #fff;
    border-radius: 2px;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3px;
    height: 16px;
    background: #fff;
    border-radius: 2px;
    transform: translate(-50%, -50%);
  }

  &:hover, &:focus {
    background: linear-gradient(90deg, #4e5666 0%, #31363b 100%);
    box-shadow: 0 4px 16px rgba(0,0,0,0.22);
    transform: scale(1.08);
    outline: none;
  }

  &:active {
    background: #23272a;
    color: #b0b0b0;
    transform: scale(0.97);
  }
}

.account-hint {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #23272a;
  border: 1.5px solid #35393e;
  border-radius: 8px;
  padding: 12px 18px;
  margin-bottom: 24px;
  font-size: 1rem;
  color: #b0b0b0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  &::before {
    content: '?';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    min-width: 26px;
    min-height: 26px;
    background: linear-gradient(135deg, #3a3f47 60%, #23272a 100%);
    color: #fff;
    font-weight: bold;
    font-size: 1.1em;
    border-radius: 50%;
    box-shadow: 0 1px 4px rgba(0,0,0,0.10);
    margin-right: 6px;
  }
}

.account-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list_head {
  display: flex;
}

.list_item {}


</style>