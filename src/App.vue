<template>
  <div id="app">
    <div id="nav">
      <div id="headerNav">
        <b-navbar  toggleable="lg" type="light" variant="light" fixed="top">
          <b-navbar-brand to="/">Iventful</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item>
                  <router-link to="/">Domov</router-link> |
              </b-nav-item>
              <b-nav-item>
                  <router-link to="/about">O nás</router-link> |
              </b-nav-item>
              <b-nav-item>
                  <router-link to="/allEvents">Všetky podujatia</router-link>
              </b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <em>{{userName}}</em>
                </template>
                <b-dropdown-item to="/profile" v-if="isLogged">Profil</b-dropdown-item>
                <b-dropdown-item to="/login" v-if="!isLogged">Prihlásiť sa</b-dropdown-item>
                <b-dropdown-item to="/signup" v-if="!isLogged">Registrovať sa</b-dropdown-item>
                <b-dropdown-item @click="logout(getToken)" v-if="isLogged">Odhlásiť sa</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <hr>
    </div>
    <router-view/>
    <div>
      <b-navbar id="bottomNavbar" class="container align-content-center" fixed="bottom" toggleable="sm" type="light" variant="light">
          <b-navbar-nav class="col leftCol">
            <b-nav-text>Iventful - 2021 all rights reserved &copy;</b-nav-text>
          </b-navbar-nav>
          <b-navbar-nav class="col middleCol align-self-center">
            <b-nav-text>Made by Dominik Kysel</b-nav-text>
          </b-navbar-nav>
          <b-navbar-nav class="col rightCol">
            <b-nav-text>Contact: kysel.dominik@gmail.com <br>
                        Phone: 9852 458 486</b-nav-text>
          </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
      userName() {
        return this.$store.getters.getUserName;
      },
      isLogged() {
        return this.$store.getters.isLogged;
      },
      getToken() {
        return this.$store.getters.getToken;
      }
  },
  methods: {
    logout(getToken: string) {
      this.$store.dispatch('logout',{
        type: 'logout',
        token: getToken
      });
    }
  }
})
</script>
<style lang="scss">
  #headerNav{
    height: 40px;
  }
  hr{
    height: 1px !important;
    background: linear-gradient(to right, white, #298cf0, white);
  }
  .nav-item{
    a {
      color: #2c3e50;

      &.router-link-exact-active {
        color: #298cf0;
      }
    }
  }
  #bottomNavbar.bg-light{
    background-color: #fff !important;
  }
  .leftCol{
    text-align: left;
  }
  .middleCol{
    text-align: center;
  }
  .rightCol{
    text-align: right;
  }
  .navbar-text{
    margin: 0 auto;
  }
</style>
