<template>
  <div id="app">
    <img src="./assets/logo.png">

<!--
      <loading v-if="loggingIn"/>  --><!--Before you know if the user is logged in or not-->
     <!-- <login v-else-if="!user && $route.meta.requiresLogin"/>
      <denied v-else-if="!user.pages.includes($route.name)"/>
      <router-view v-else/> 
    -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
