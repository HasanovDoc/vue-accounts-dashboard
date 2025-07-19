<template>
  <div class="account-form" :class="{ 'has-error': hasError }">
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
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, defineExpose } from 'vue';
import { Account } from '@/types/account';

const props = defineProps<{ account: Account }>();
const emit = defineEmits(['update', 'delete']);

const hasError = ref(false);
const localLabelStr = ref(props.account.label?.map(l => l.text).join(';') || '');
const localAccount = ref<Account>({ ...props.account });
const firstInput = ref<HTMLInputElement | null>(null);


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

const focusFirstInput = () => {
  firstInput.value?.focus();
};

defineExpose({ focusFirstInput });
</script>