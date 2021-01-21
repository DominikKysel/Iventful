<template>
    <div class="event container justify-content-md-center">
        <div class="row">
            <div class="col-2">
                <span id="backSpan" @click="goBack()"><b-icon icon="arrow-left-short"></b-icon>Späť</span>
            </div>
        </div>
        <div class="row">
            <b-col align-self="center">
                <div class="row" style="margin-bottom:2%;">
                    <div class="col">
                        <b-img 
                            class="mx-auto d-block"
                            :src="event.poster.path"
                            fluid
                        >
                        </b-img>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h5><b-icon icon="map" variant="info"></b-icon> {{event.address}}</h5>
                    </div>
                    <div class="col">
                        <h5><b-icon icon="calendar-event" variant="info"></b-icon> {{event.date_start}}</h5>
                    </div>
                    <div class="col">
                        <h5><b-icon icon="calendar-event" variant="info"></b-icon> {{event.date_end}}</h5>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <h1>{{event.name}}</h1>
                </div>
                <div class="row">
                    <p>{{event.description}}</p> 
                </div>
            </b-col>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import router from 'vue-router'
@Component({
    data: function(){
        return {
            event: null,
            eventId: this.$route.params.id
        }
    },
    mounted () {
        axios
        .get('http://localhost:8000/event/'+this.$data.eventId)
        .then(response => {
            this.$data.event=response.data;
        })
        .catch(e => {
            alert(e);
        })
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
})
export default class Event extends Vue {}
</script>
<style lang="scss" scoped>
    #backSpan{
        color: #dc3545;
        cursor: pointer;
    }
    #backSpan:hover{
        font-weight: bold;
    }
</style>