<template>
  <div class="container justify-content-md-center">
    <b-modal ref="my-modal" hide-footer title="Pozor! Táto akcia sa nedá zvrátiť">
      <div class="d-block text-center">
          <h3>Ste si istý, že chcete toto podujatie vymazať?</h3>
      </div>
      <div class="row">
          <b-button class="col" variant="danger" @click="deleteEvent(event.id)">Vymazať</b-button>        
          <b-button class="col" variant="secondary" @click="hideModal()">Zrušiť</b-button>
      </div> 
    </b-modal>
    <h1>{{userName}}</h1>
    <h5>{{userEmail}}</h5>
    <h5>Registered at: {{registeredTime}}</h5>
    <hr>
    <div class="row">
      <b-button class="col-4" to="/createEvent" variant="primary">Pridať udalosť</b-button>
    </div>
    <b-row>
      <b-col class="profileMenu">
        <h2 class="profileMenuItem hover hover-3" v-bind:class="{active: viewMyEvents}"
        v-on:click="viewMyEvents=true">Moje udalosti</h2>
      </b-col>
      <b-col class="profileMenu">
        <h2 class="profileMenuItem hover hover-3" v-bind:class="{active: !viewMyEvents}"
        v-on:click="viewMyEvents=false">Sledované udalosti</h2>
      </b-col>
    </b-row>
    <div class="row" v-if="viewMyEvents">
      <div class="col-3" v-for="event in events" :key="event.event">
        <ProfileCard class="Card" :event="event"/>
      </div>
    </div>
    <div class="row" v-if="!viewMyEvents">
      <div class="col-3" v-for="event in followedEvents" :key="event.event">
        <Card class="Card" :event="event"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import axios from 'axios'
import ProfileCard from '@/components/ProfileCard.vue';
import Card from '@/components/FollowedCard.vue';

@Component({
    components: {
        ProfileCard,
        Card,
    },
    data: function() {
        return {
            events: [],
            followedEvents: null,
            userName: '',
            userEmail: '',
            registeredTime: '',
            viewMyEvents: true
        }
    },
    mounted() {
      const userId = this.$store.getters.getUserId;
      axios
        .get('http://localhost:8000/events/'+userId)
        .then(response => {
          this.$data.events=response.data;
        })
        .catch(e => {
          alert(e);
        });
      axios
        .get('http://localhost:8000/api/v1/auth/userinfo',{headers: {
          Authorization: `Bearer ${this.$store.getters.getToken}`
        }})
        .then(response => {
          this.$data.userName = response.data.user.name;
          this.$data.userEmail = response.data.user.email;
          this.$data.registeredTime = response.data.user.created_at;
        })
        .catch(e => {
          alert(e);
          this.$store.commit('setToken', '');
          this.$store.commit('setUserName', 'Používateľ');
          this.$store.commit('setUserId', '');
          this.$store.commit('setLoggedFalse');          
          this.$router.push("/");
        });
      axios
      .get('http://localhost:8000/following/'+this.$store.getters.getUserId, {headers: {
          Authorization: `Bearer ${this.$store.getters.getToken}`
      }})
      .then(response => {
          this.$data.followedEvents = response.data;
          console.log(this.$data.followedEvents);
      })
      .catch(e => {
          alert(e);
      })
  }
})

export default class Profile extends Vue {}
</script>
<style lang="scss" scoped>
  $animate: all 0.2s ease-in-out;

  .profileMenuItem{
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }
  .profileMenuItem .acitve{
    color: #298cf0;
  }
  .profileMenu{
    margin: 20px 0;
    .hover {
      transition: $animate;
      position: relative;
      &:before,
      &:after {
        content: "";
        position: absolute;
        bottom: -10px;
        width: 0px;
        height: 5px;
        margin: 5px 0 0;
        transition: $animate;
        transition-duration: 0.75s;
        opacity: 0;
        background-color: #298cf0;
      }
      &.hover-3 {
        &:before {
          left: 50%;
        }
        &:after {
          right: 50%;
        }
      }
    }
    &:hover {
      cursor: pointer;
      .hover {
        &:before,
        &:after {
          width: 100%;
          opacity: 1;
        }
        &.hover-3{
          &:before,
          &:after {
            width: 50%;
          }
        }
      }
    }
    .active {
      cursor: pointer;
      color: #298cf0;
      &.hover {
        &:before,
        &:after {
          width: 100%;
          opacity: 1;
        }
        &.hover-3{
          &:before,
          &:after {
            width: 50%;
          }
        }
      }
    }
  }
</style>