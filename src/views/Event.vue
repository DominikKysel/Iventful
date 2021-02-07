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
                    <b-col align-self="center">
                        <h5 class="mainInfo"><b-icon icon="map" variant="info"></b-icon><br>Adresa: {{event.address}}</h5>
                    </b-col>
                    <b-col align-self="center">
                        <h5 class="mainInfo"><b-icon icon="calendar-event" variant="info"></b-icon><br>Od: {{event.date_start}}</h5>
                    </b-col>
                    <b-col align-self="center">
                        <h5 class="mainInfo"><b-icon icon="calendar-event" variant="info"></b-icon><br>Do: {{event.date_end}}</h5>
                    </b-col>
                </div>
                <hr>
                <div class="row">
                    <b-col id="nameCol">
                        <h1>{{event.name}}</h1>
                    </b-col>
                    <b-col id="btnCol" v-if="isLogged">
                        <b-button id="followBtn" variant="danger" v-if="!isFollowed" @click="follow()">
                            <b-icon-heart></b-icon-heart>
                            Sledovať
                        </b-button>
                        <b-button id="followBtn" variant="outline-danger" v-if="isFollowed" @click="unfollow()">
                            <b-icon-heart-fill></b-icon-heart-fill>
                            Prestať sledovať
                        </b-button>
                    </b-col>
                </div>
                <div class="row">
                    <b-col>
                        <p>{{event.description}}</p> 
                    </b-col>
                </div>
            </b-col>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
@Component({
    data: function(){
        return {
            event: null,
            eventId: this.$route.params.id,
            isFollowed: false,
            followingId: ""     
        }
    },
    computed: {
        isLogged() {
            return this.$store.getters.isLogged;
      },
    },
    mounted () {
        const userId = this.$store.getters.getUserId;
        axios
        .get('http://localhost:8000/event/'+this.$data.eventId)
        .then(response => {
            this.$data.event=response.data;
        })
        .catch(e => {
            alert(e);
        });
        if(this.$store.getters.isLogged){
                axios
                .get('http://localhost:8000/following/'+userId, {headers: {
                    Authorization: `Bearer ${this.$store.getters.getToken}`
                }})
                .then(followResponse => {
                    followResponse.data.forEach(element => {
                        if(this.$data.event.id == element.event_id){
                            this.$data.isFollowed = true;
                            this.$data.followingId = element.id;
                            return;
                        }
                    });
                })
                .catch(e => {
                    alert(e);
                })
            }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        follow() {
            const token = this.$store.getters.getToken;
            const userId = this.$store.getters.getUserId;
            const follow = {
                "user_id": userId,
                "event_id": this.$data.event.id,
            };
            axios
            .post('http://localhost:8000/follow', follow, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                this.$data.isFollowed = true;
                location.reload();
            })
            .catch(e => {
                alert(e);
            })
        },
        unfollow() {
            axios
            .delete('http://localhost:8000/follow/'+this.$data.followingId, {headers: {
                    Authorization: `Bearer ${this.$store.getters.getToken}`
            }})
            .then(()=>{
                this.$data.isFollowed = false;
                alert("Prestali ste sledovať túto udalosť.");
                location.reload();
            })
            .catch(e => {
                alert(e)
            })
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
    .mainInfo{
        text-align: center;
    }
    #nameCol h1{
        padding: 0;
    }
    #btnCol{
        text-align: right;
    }
    #followBtn{
        margin: 0 auto;
    }
</style>