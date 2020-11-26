<template>
<div>
  <b-navbar type="dark" variant="info">
    <b-navbar-brand href="#">ey-go</b-navbar-brand>
    <b-navbar-nav>
        <b-nav-item v-on:click="$emit('show-set-editor', null)" href="#">+ set</b-nav-item>
    </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="loading.sets || loading.login" class="ml-auto">
        <b-nav-item>
          <b-spinner label="Spinning" variant="success"></b-spinner>
        </b-nav-item>        
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-navbar-nav>
        <b-nav-item>
        <sets-dropdown
          :sets="user.sets"
          v-on:show-slideshow="$emit('show-slideshow', $event)"
          v-on:show-set-editor="$emit('show-set-editor', $event)"
        />
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item>
        <user-menu
          :user="user"
        />
        </b-nav-item>
      </b-navbar-nav>
      </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
import SetsDropdown from './SetsDropdown';
import UserMenu from './UserMenu';

export default {
    name: 'Navbar',
    components: {
      SetsDropdown,
      UserMenu
    },
    props: {
      user: Object,
      loading: Object
    },
    data: function () {
        return {
            welcomeMsg: "Hello, " + this.user.username,
            loginMsg: "Please login."        
          }
    },
}
</script>
