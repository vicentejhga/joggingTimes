<template>
	<div v-if="this.$route.path!='/'&&this.$route.path!='/register'">
	<router-link class="btn btn-default" :to="{ name: 'Home' }" v-bind:class="{active:this.$route.path=='/home'}">
      Home
  	</router-link>
  		<router-link class="btn btn-default" :to="{ name: 'Times' }" v-bind:class="{active:this.$route.path=='/times'}">
      Times
  	</router-link>
		<router-link class="btn btn-default" :to="{ name: 'Users' }" v-bind:class="{active:this.$route.path=='/users'}">
      Users
  	</router-link>

  	<router-link class="btn btn-default" :to="{ name: 'Weekly' }" v-bind:class="{active:this.$route.path=='/weekly'}">
      Weekly report
  	</router-link>

  	<router-link class="btn btn-default" :to="{ name: 'Register' }" v-bind:class="{active:this.$route.path=='/logout'}">
      Log out
  	</router-link>
  	</div>
</template>

<script>
export default {
  name: 'menu'
}
</script>
<style scoped>

</style>