<template>
  <div class="account-form" :class="{ 'has-error': hasError }">
    <div class="form-header" v-if="isFirst">
      <span class="header-label">Метки</span>
      <span class="header-type">Тип</span>
      <span class="header-login">Логин</span>
      <span class="header-password" v-if="localAccount.type === 'Локальная'">Пароль</span>
      <span class="header-action"></span>
    </div>
    <div class="form-row" :class="{ 'no-password': localAccount.type !== 'Локальная' }">
      <div class="row__item">
        <input 
          ref="firstInput"
          v-model="localLabelStr" 
          placeholder="Метка (через ';')" 
          @blur="handleLabelChange"
        />
      </div>

      <div class="row__item">
        <select v-model="localAccount.type" @change="handleChange">
          <option value="Локальная">Локальная</option>
          <option value="LDAP">LDAP</option>
        </select>
      </div>

      <div class="row__item" :class="{ 'no-password': localAccount.type !== 'Локальная' }">
        <input 
          v-model="localAccount.login" 
          placeholder="Логин*" 
          required 
          @blur="validate"
        />
      </div>
      <div class="row__item" v-if="localAccount.type === 'Локальная'">
        <input 
          v-model="localAccount.password"
          type="password"
          placeholder="Пароль*"
          required
          @blur="validate"
        />
      </div>

      <div class="row__item">
        <button class="delete-btn" @click="$emit('delete')" title="Удалить">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 7V15C6 15.55 6.45 16 7 16H13C13.55 16 14 15.55 14 15V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M4 7H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M8 7V5C8 4.45 8.45 4 9 4H11C11.55 4 12 4.45 12 5V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, defineExpose, computed } from 'vue';
import { Account } from '@/types/account';
import { useAccountsStore } from '@/stores/accounts';

const props = defineProps<{ account: Account }>();
const emit = defineEmits(['update', 'delete']);

const hasError = ref(false);
const localLabelStr = ref(props.account.label?.map(l => l.text).join(';') || '');
const localAccount = ref<Account>({ ...props.account });
const firstInput = ref<HTMLInputElement | null>(null);
const store = useAccountsStore();


const handleLabelChange = () => {
  const labels = localLabelStr.value
    .split(';')
    .filter(t => t.trim())
    .map(text => ({ text }));
  emit('update', { ...localAccount.value, label: labels });
};

const handleChange = () => {
  emit('update', localAccount.value);
};

const validate = () => {
  hasError.value = !localAccount.value.login || 
                  (localAccount.value.type === 'Локальная' && !localAccount.value.password);
  if (!hasError.value) emit('update', localAccount.value);
};

const isFirst = computed(() => {
  return store.accounts.length > 0 && store.accounts[0].id === props.account.id;
});

const focusFirstInput = () => {
  firstInput.value?.focus();
};

defineExpose({ focusFirstInput });
</script>

<style scoped lang="scss">

input, select {
  width: 100%;
  height: 100%;
}

button {
  width: min-content;
}

.account-form {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-header, .form-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr 0.8fr;
  align-items: center;
  gap: 8px;
}

.form-row.no-password {
  grid-template-columns: 2fr 1fr 3.0455fr 0.8fr;
  /* gap: 8px; */
}

.row__item {
  /* border: 1px solid white; */
  &:last-child {
    width: max-content;
  }
  &.no-password {
    /* width: calc(100% - 2.35px); */
    /* width: 100%; */
  }
  /* width: max-content; */
}

.form-header {
  font-size: 0.95em;
  color: #b0b0b0;
  font-weight: 500;
  margin-bottom: 2px;
}

.delete-btn {
  background: none;
  width: min-content;
  border: none;
  padding: 0.3em;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0b0b0;
  transition: background 0.5s, color 0.2s;

  &:hover, &:focus {
    background: #23272a;
    color: #ff5555;
    outline: none;
  }
}

.header-password {
  display: inline;
}

@media (max-width: 900px) {
  .form-header, .form-row {
    grid-template-columns: 1.5fr 1fr 1.2fr 1.2fr 0.8fr;
    gap: 6px;
  }
  .form-row.no-password {
    grid-template-columns: 1.5fr 1fr 2.45fr 0.8fr;
  }
}

@media (max-width: 600px) {
  .form-header {
    display: none;
  }
  .form-row,
  .form-row.no-password {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 0;
    border-bottom: 1px solid #23272a;
  }
  .form-row > *,
  .form-row.no-password > * {
    width: 100%;
    min-width: 0;
    &:last-child {
      width: max-content;
    }
  }
  .delete-btn {
    align-self: center;
  }
}
</style>