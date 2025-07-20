<template>
  <div class="account-form" :class="{ 'has-error': hasError }">
    <div class="form-header" v-if="isFirst">
      <span class="header-label">Метки</span>
      <span class="header-type">Тип</span>
      <span class="header-login">Логин</span>
      <span class="header-password" v-if="localAccount.type === 'Локальная'">Пароль</span>
      <span class="header-action"></span>
    </div>
    <div class="form-row">
      <input 
        ref="firstInput"
        v-model="localLabelStr" 
        placeholder="Метка (через ';')" 
        @blur="handleLabelChange"
      />
      <select v-model="localAccount.type" @change="handleChange">
        <option value="Локальная">Локальная</option>
        <option value="LDAP">LDAP</option>
      </select>
      <input 
        v-model="localAccount.login" 
        placeholder="Логин*" 
        required 
        @blur="validate"
      />
      <input 
        v-if="localAccount.type === 'Локальная'"
        v-model="localAccount.password"
        type="password"
        placeholder="Пароль*"
        required
        @blur="validate"
      />
      <button @click="$emit('delete')">Удалить</button>
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

.form-header {
  font-size: 0.95em;
  color: #b0b0b0;
  font-weight: 500;
  margin-bottom: 2px;
}

.header-password {
  // Скрывать, если не локальная
  display: inline;
}
</style>