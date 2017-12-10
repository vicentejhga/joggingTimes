<template>
  <div id="app">
    <img src="./assets/logo.png">  
    <app-menu ></app-menu>  
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  components: { 
      'app-menu': Menu
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.danger {
      color:white;
      background-color: #dc3545;    
}

 tr th { 
  text-align: center;
  background-color: #ccc
}
</style>
