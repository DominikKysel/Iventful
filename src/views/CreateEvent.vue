<template>
    <div class="create-event container">
        <b-form v-on:submit.prevent="addEvent()" @cancel="goBack()">
            <b-form-group
                id="input-group-1"
                label="Názov udalosti"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="eventName"
                    placeholder="Zadajte názov udalosti"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Obrázok akcie"
                label-for="input-2"
            >
                <div id="preview">
                    <b-img width="200" height="200" v-if="url" :src="url" />
                </div>
                <b-form-file
                    id="input-2"
                    v-model="eventPoster"
                    accept="image"
                    placeholder="Vyberte obrázok alebo ho sem položte"
                    drop-placeholder="Položiť sem"
                    @change="onFileChange"
                    required
                ></b-form-file>
            </b-form-group>

            <b-form-group
                id="input-group-3"
                label="Miesto udalosti"
                label-for="input-3"
                description="Zadajte ideálne čo najpresnejšiu polohu"
            >
                <b-form-input
                    id="input-3"
                    v-model="eventAddress"
                    placeholder="Zadajte adresu alebo miesto udalosti"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-4"
                label="Začiatok udalosti"
                label-for="input-4"
            >
                <b-form-datepicker
                    id="input-4"
                    v-model="eventStartDate"
                    required
                ></b-form-datepicker>
            </b-form-group>

            <b-form-group
                id="input-group-5"
                label="Koniec udalosti"
                label-for="input-5"
            >
                <b-form-datepicker
                    id="input-5"
                    v-model="eventEndDate"
                    required
                ></b-form-datepicker>
            </b-form-group>

            <b-form-group
                id="input-group-6"
                label="Popis udalosti"
                label-for="input-6"
            >
                <b-form-input
                    id="input-6"
                    type="text"
                    v-model="eventDescription"
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
            eventName: "",
            eventPoster: null,
            eventAddress: "",
            eventStartDate: "",
            eventEndDate: "",
            eventDescription: "",
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },

        addEvent() {
            let poster;
            const token = this.$store.getters.getToken;
            const name = this.$data.eventName;
            const address = this.$data.eventAddress;
            const dateStart = this.$data.eventStartDate;
            const dateEnd = this.$data.eventEndDate;
            const description = this.$data.eventDescription;
            function sendEventData(event){
                axios
                .post('http://localhost:8000/event',event,
                {
                    headers: {
                            Authorization: `Bearer ${token}`
                            }
                })
                .then(response => {
                    alert('Podujate bolo úspešne pridané');
                })
                .catch(e =>{
                    alert(e);
                })
            }
            const userId = this.$store.getters.getUserId;
            this.convertImg(this.$data.eventPoster,function(img){
                poster = img;
                const event = {
                    "name": name,
                    "poster": poster,
                    "user_id": userId,
                    "address": address,
                    "date_start": dateStart,
                    "date_end": dateEnd,
                    "description": description
                };
                sendEventData(event);
            });
            this.$router.go(-1);
        },

        convertImg(file, cb){
            let img;
            const reader = new FileReader();
            reader.onloadend = function() {
                img = reader.result;
                cb(img);       
            },
            reader.readAsDataURL(file);  
        },

        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        }
    },
})
</script>
<style lang="scss" scoped>

</style>