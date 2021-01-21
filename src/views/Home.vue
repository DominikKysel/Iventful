<template>
  <div class="home container justify-content-md-center">
    <div class="row">
      <div class="col mainCols">
        <h1>Eventful</h1>
        <p>Eventful je miesto, na ktorom môžete nájsť podujatia rôznych typov.
          Či už sa jedná hudobné festivali, výstavi technologických noviniek alebo neorganizované stretnutia, tu ich môžete nájsť.
          Ako som spomenul budú tu neorganizované stretnutia, to znamená, že hocikto môže založiť udalosť, ktorú ľudia uvidia a môžu dôjsť.
          Ak ste organizátor môžete požiadať o overenie a po overení, budú vaše podujatia kategorizované ako oficiálne.
        </p>
      </div>
      <div class="col" style="text-align:center;margin-top:15%;">
        <div class="row">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="320"
            style="max-height:20rem;text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <!-- Text slides with image -->
            <b-carousel-slide
              v-for="event in events" :key="event.event"
              :caption= event.name
              :text= event.description
              :img-src= event.poster.path
            ></b-carousel-slide>
          </b-carousel>
        </div>
        <b-button id="zobrazitViacBtn" to="/allEvents" variant="outline-primary">Zobraziť všetky podujatia</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card,
  },
  data: function(){
    return {
      events: [],
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart(slide) {
        this.$data.sliding = true
      },
      onSlideEnd(slide) {
        this.$data.sliding = false
      }
  },
  mounted () {
    axios
      .get('http://localhost:8000/events/few')
      .then(response => {
        this.$data.events=response.data;
      })
      .catch(e => {
        alert(e);
      })
  }
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
  //altered bootstrap classes
  @import '../assets/css/custom.css';
  //****************** */
  #zobrazitViacBtn{
    margin-top: 5%;
  }
  .mainCols{
    margin-top: 20%;
  }
</style>