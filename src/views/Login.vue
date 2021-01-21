<template>
    <div class="container">
        <b-form v-on:submit.prevent="login()">
            <b-form-group
                id="input-group-1"
                label="Emailová adresa:"
                label-for="input-1"
                description="Vašu emailovú adresu nikomu neposkytneme."
            >
                <b-form-input
                    id="input-1"
                    type="email"
                    placeholder="Zadajte email:"
                    v-model="email"
                    required
                >
                </b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Heslo"
                label-for="input-2"
            >
                <b-form-input
                    id="input-2"
                    type="password"
                    placeholder="Zadajte heslo:"
                    v-model="password"
                    required
                >
                    
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Potvrdiť</b-button>
            <b-button type="cancel" variant="danger" @click="goBack()">Zrušiť</b-button>
        </b-form>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data: function() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                type: 'login',
                email: this.$data.email,
                password: this.$data.password
            });
            this.$router.go(-1);
        },
        goBack() {
            this.$router.go(-1);
        }
    }  
})
</script>
<style lang="scss" scoped>
    .container{
            margin-top: 10%;
        }
</style>