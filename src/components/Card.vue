<template>
    <div>
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
        </b-card>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop() private event!: object;

}
</script>
<style lang="scss" scoped>

</style>