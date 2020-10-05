<template>
  <div class="menu">
    <p v-if="isUserLoggedIn">{{ welcomeMsg }}</p>
    <p v-if="!isUserLoggedIn">{{ loginMsg }}</p>
    <button v-on:click="$emit('toggle-login')">Toggle login</button>
  </div>
</template>

<script>

export default {
  name: 'Menu',
  props: {
    username: String,
    isUserLoggedIn: Boolean,
  },
  data: function () {
    return {
      welcomeMsg: "Welcome back, " + this.username + '.',
      loginMsg: "Please login."
    }
  },
  // computed: {
  //   welcomeMsg: function () {
  //       let welcomeMsg = "Welcome back, " + {username};

  //       data.welcomeMsg = welcomeMsg;
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
