<template>
    <div class="allEvents container justify-content-md-center">
        <div class="row">
            <b-input-group class="col-8">
                <b-input-group-prepend is-text>
                    <b-icon icon="search"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="text" v-model="searchInput" placeholder="Zadajte názov podujatia, ktoré hladáte"></b-form-input>
            </b-input-group>
            <b-button v-if="isLogged" class="col-4" to="/createEvent" variant="primary">Pridať udalosť</b-button>
        </div>
        <div class="row">
            <div class="col-lg-3" v-for="event in filteredEvents" :key="event.event">
                <Card :event="event"/>
            </div>
            <div class="col" v-if="checkIfEmpty">
                <b-alert show variant="danger">Zadaný výraz sa nenašiel</b-alert>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import axios from 'axios'
import Card from '@/components/Card.vue'

@Component({
    components: {
        Card,
    },
    data: function(){
    return {
        searchInput: null,
        events: [],
    }
  },
  mounted () {
    axios
      .get('http://localhost:8000/events/all')
      .then(response => {
        this.$data.events=response.data;
      })
      .catch(e => {
        alert(e);
      })
  },
  computed:{
    isLogged() {
    return this.$store.getters.isLogged;
    },

    filteredEvents: function(){
        let events = this.$data.events;
        let searchVal = this.$data.searchInput;

        if(!searchVal){
            return events;
        }
        searchVal = searchVal.trim().toLowerCase();

        events = events.filter(function(event: { name: string }){
            if(event.name.toLowerCase().indexOf(searchVal) !== -1){
                return event;
            }
        })

        return events;
    },
    
    checkIfEmpty: function(){
        if(this.$data.filteredEvents == 0){
            return true;
        }
        else{
            return false;
        }
    }
  }
})

export default class AllEvents extends Vue {
}
</script>
<style lang="scss" scoped>
    .row{
        margin-top: 2%;
    }
</style>