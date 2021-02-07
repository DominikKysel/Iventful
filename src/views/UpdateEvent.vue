<template>
    <div class="create-event container">
        <b-form v-on:submit.prevent="updateEvent()" @cancel="goBack()">
            <b-form-group
                id="input-group-1"
                label="Názov udalosti"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="event.name"
                    placeholder="Zadajte názov udalosti"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Miesto udalosti"
                label-for="input-2"
            >
                <b-form-input
                    id="input-2"
                    v-model="event.address"
                    placeholder="Zadajte adresu alebo miesto udalosti"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-3"
                label="Začiatok udalosti"
                label-for="input-3"
            >
                <b-form-datepicker
                    id="input-3"
                    v-model="event.date_start"
                    required
                ></b-form-datepicker>
            </b-form-group>

            <b-form-group
                id="input-group-4"
                label="Koniec udalosti"
                label-for="input-4"
            >
                <b-form-datepicker
                    id="input-4"
                    v-model="event.date_end"
                    required
                ></b-form-datepicker>
            </b-form-group>

            <b-form-group
                id="input-group-5"
                label="Popis udalosti"
                label-for="input-5"
            >
                <b-form-input
                    id="input-5"
                    type="text"
                    v-model="event.description"
                    placeholder="Popíšte Vašu udalosť"
                    required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Potvrdiť</b-button>
            <b-button type="cancel" @click="goBack()" variant="danger">Zrušiť</b-button>
        </b-form>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
   data: function(){
        return {
            url: null,
            eventId: this.$route.params.id,
            event: {
                "name": '',
                "address": '',
                "date_start": '',
                "date_end": '',
                "description": ''
            }
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        updateEvent() {
            const token = this.$store.getters.getToken;
            axios
            .patch(`http://localhost:8000/event/${this.eventId}`, {
                "name": this.event.name,
                "address": this.event.address,
                "date_start": this.event.date_start,
                "date_end": this.event.date_end,
                "description": this.event.description
            }, {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(() => {
                this.$router.go(-1);
            })
            .catch(e => {
                alert(e);
                this.$router.go(-1);
            })
        }
    },
    mounted () {
        axios
        .get('http://localhost:8000/event/'+this.$data.eventId)
        .then(response => {
            this.$data.event=response.data;
            this.$data.url = response.data.poster.path;
        })
        .catch(e => {
            alert(e);
        })
    } 
})
</script>
<style lang="scss" scoped>

</style>