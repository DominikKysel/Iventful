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
    <div class="row">
      <div class="col-3" v-for="event in events" :key="event.event">
        <Card class="Card" :event="event"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import axios from 'axios'
import Card from '@/components/ProfileCard.vue';

@Component({
    components: {
        Card,
    },
    data: function() {
        return {
            events: [],
            userName: '',
            userEmail: '',
            registeredTime: ''
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
  }
})

export default class Profile extends Vue {}
</script>
<style lang="scss" scoped>

</style>