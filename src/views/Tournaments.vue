<template>
  <div class="columns is-multiline is-align-items-center">
    <div class="column is-9 is-flex is-justify-content-space-between is-align-items-center">
      <router-link :to="'/'" class="is-link has-text-grey-lighter">Back to home</router-link>
      <router-link v-if="player.role == 'admin'" :to="'/tournaments/new'" class="button is-primary">New Tournament</router-link>
    </div>
    <div class="column is-9">
      <div class="box box--table">
        <h3 class="title is-5">Tournaments</h3>

        <b-table :data="tournamentData" :mobile-cards="false"  class="is-large table-large">
          <b-table-column field="game_type" label="Type" v-slot="props">
            {{
              props.row.game_type | gameType
            }}
          </b-table-column>
          <b-table-column field="players_per_team" label="Players per team" v-slot="props">
            {{
              props.row.players_per_team
            }}
            players
          </b-table-column>
          <b-table-column field="datetime" label="Start DateTime" v-slot="props">
            {{
              props.row.datetime | date
            }}
          </b-table-column>
          <b-table-column field="status" label="Status" v-slot="props">
            <span :class="'status status--'+tournamentStatus(props.row)"></span>
            {{
              tournamentStatus(props.row)
            }}
          </b-table-column>
          <b-table-column field="price" label="Price" v-slot="props">
              {{
                props.row.price
              }}
          </b-table-column>
          <b-table-column  field="id" label="" v-slot="props" cell-class="has-text-right">
            <router-link :to="'/tournaments/'+props.row._id" class="is-link has-text-grey-lighter">Details</router-link>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'Tournaments',
  components: {

  },
  computed: {
    ...mapGetters(['player']),
  },
  filters: {
    gameType: function(type){
      return type.replace("_", " - ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    },
    date: function(date){
      return new Date(date).toLocaleString('en-GB');
    },
  },
  methods: {
    ...mapActions(['getTournaments', 'getProfile']),
    fetchTournaments: async function(){
      const tournamentData = await this.getTournaments();
      console.log(tournamentData);  
      this.tournamentData = tournamentData.data.tournaments;
    },
    tournamentStatus: function(tournament) {
      const date = new Date();
      const tournamentDate = new Date(tournament.datetime);

      if(tournament.ended){
        return 'ended';
      } else if(tournamentDate.getTime() > date.getTime()){
        return 'upcoming';
      } else {
        return 'started';
      }
    }
  },
  mounted() {
    this.fetchTournaments();
  },
  created(){
    this.getProfile();
  },
  data(){
    return {
      tournamentData: [],
    }
  }
}
</script>
