<template>
  <AccountList />
</template>

<script setup lang="ts">
import AccountList from './components/AccountList.vue';
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body, #app {
  min-height: 100vh;
  background: #181a1b;
  color: #e0e0e0;
}

button {
  background: #23272a;
  color: #e0e0e0;
  border: none;
  border-radius: 6px;
  padding: 0.5em 1.2em;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.2s, color 0.2s;

  &:hover, &:focus {
    background: #31363b;
    color: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    outline: none;
  }

  &:active {
    background: #181a1b;
    color: #b0b0b0;
  }
}

input {
  background-color: #1e1e1e;
  color: #e0e0e0;
  border: 1px solid #333;
  padding: 0.5em 1em;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #858788;
    box-shadow: 0 0 5px rgba(147, 149, 151, 0.5);
    outline: none;
  }

  &::placeholder {
    color: #777;
  }
}

select {
  background-color: #1e1e1e;
  color: #e0e0e0;
  border: 1px solid #333;
  padding: 0.5em 1em;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    /* border-color: #858788;
    box-shadow: 0 0 5px rgba(147, 149, 151, 0.5); */
    outline: none;
  }
}
</style>