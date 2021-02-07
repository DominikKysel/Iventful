<template>
    <div>
        <b-modal id="my-modal" hide-footer title="Pozor! Táto akcia sa nedá zvrátiť">
            <div class="d-block text-center">
                <h3>Ste si istý, že chcete toto podujatie vymazať?</h3>
            </div>
            <div class="row">
                <b-button class="col" variant="danger" @click="deleteEvent(event.id)">Vymazať</b-button>        
                <b-button class="col" variant="secondary" @click="hideModal()">Zrušiť</b-button>
            </div> 
        </b-modal>

        <b-card
            :title= event.name
            :sub-title= event.address
            :img-src= event.poster.path
            img-alt="Image"
            img-height="200"
            img-width="200"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="h-100"
        >
            <b-card-text>
                {{event.description}}
            </b-card-text>

            <b-button :to="'/event/'+event.id" variant="primary">Zobraziť viac</b-button>
            <div class="row">
                <div class="col">
                    <b-button :to="'/updateEvent/'+event.id" variant="primary" >
                        Upraviť
                    </b-button>
                </div>
                <div class="col">
                    <b-button variant="danger" @click="showModal()">
                        Odstrániť
                    </b-button>
                </div>
            </div>
        </b-card>
    </div>
    
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Card extends Vue {
    @Prop() private event!: object;

    private hideModal(){
        this.$bvModal.hide("my-modal");
    }
    private showModal() {
        this.$bvModal.show("my-modal");
    }
    private deleteEvent(id: string){
        const token = this.$store.getters.getToken;
        axios
        .delete(`http://localhost:8000/event/${id}`, { headers: {
            Authorization: `Bearer ${token}`
        }})
        .then(() => {
            this.hideModal();
            location.reload();
        })
        .catch(e => {
            this.hideModal();
            alert(e);
        })
    }
}
</script>
<style lang="scss" scoped>

</style>