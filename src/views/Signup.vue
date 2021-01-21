<template>
    <div class="container">
        <b-form v-on:submit.prevent="signup()">
            <b-form-group
                id="input-group-1"
                label="Vaše meno:"
                label-for="input-1" 
            >
                <b-form-input
                    id="input-1"
                    type="name"
                    placeholder="Používateľské meno"
                    v-model="name"
                    required
                >

                </b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="Emailová adresa:"
                label-for="input-2"
                description="Vašu emailovú adresu nikomu neposkytneme."
            >
                <b-form-input
                    id="input-2"
                    type="email"
                    placeholder="Zadajte email:"
                    v-model="email"
                    required
                >
                </b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-3"
                label="Zadajte heslo"
                label-for="input-3"
            >
                <b-form-input
                    id="input-3"
                    type="password"
                    placeholder="Zadajte heslo:"
                    v-model="password"
                    required
                >
                    
                </b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-4"
                label="Potvrďte heslo:"
                label-for="input-4"
            >
                <b-form-input
                    id="input-4"
                    type="password"
                    placeholder="Potvrďte heslo:"
                    v-model="confirmPassword"
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
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    },
    methods: {
        signup() {
            this.$store.dispatch('signup', {
                type: 'signup',
                name: this.$data.name,
                email: this.$data.email,
                password: this.$data.password,
                confirmPassword: this.$data.confirmPassword

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