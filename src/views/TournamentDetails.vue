<template>
  <div class="columns is-multiline">
    <div class="column is-12 is-flex is-justify-content-space-between is-align-items-center">
      <router-link :to="'/'" class="is-link has-text-grey-lighter">Back to home</router-link>
    </div>
    <div class="column is-8">
      <div class="box box--table">
        <h3 class="title is-5">Tournament Teams</h3>
        <b-table 
          :data="tournamentData.teams" 
          :mobile-cards="false" 
          detailed
          custom-detail-row
          :show-detail-icon="showDetailIcon"
          detail-key="_id"
          class="is-large table--teams"
        >
          <b-table-column field="team_name" label="Team name" v-slot="props">
            {{
              props.row.team_name
            }}
          </b-table-column>
          <b-table-column field="teamSize" label="Team size / players present" v-slot="props">
            {{
              tournamentData.players_per_team
            }}
            /
            <span v-if="props.row.players && props.row.players.length">
              {{props.row.players.length}}
            </span>
            <span v-else>0</span>
          </b-table-column>
          <b-table-column  field="id" label="" cell-class="has-text-right" v-slot="props">
            <template v-if="loggedInPlayerInTeam(props.row.players)">
              <b-button 
                class="table__button-fix" 
                type="is-danger" 
                @click="leaveTeam(props.row.id)"
              >
                Leave
              </b-button>
            </template>
            <template v-else>
              <b-button 
                class="table__button-fix" 
                type="is-primary" 
                @click="joinTeam(props.row.id)"
                :disabled="props.row.teamSize <= props.row.playersPresent"
              >
                Join
              </b-button>
            </template>
          </b-table-column>

          <template slot="detail" slot-scope="props">
            <tr class="table--teams__players" >
              <td colspan="4" class="table--teams__players__table-wrapper">
                <table v-if="props.row.players.length > 0">
                  <thead>
                    <tr>
                      <th>Player name</th>
                      <th>Total points</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="player in props.row.players" :key="'player-'+player.id">
                      <td>{{player.name}}</td>
                      <td>{{player.points}}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <div class="has-text-centered py-6" v-else>No players present</div>
              </td>
            </tr>
          </template>
           <template #empty>
                <div class="has-text-centered">No records</div>
            </template>
        </b-table>
      </div>
    </div>
    <div class="column is-4">
      <TournamentForm :formData="tournamentData" @submitTournament="submit"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

// @ is an alias to /src
import TournamentForm from '@/components/forms/Tournament';

export default {
  name: 'TournamentDetails',
  components: {
    TournamentForm
  },
  props: {
    isNewTournament: {
      type: Boolean
    }
  },
  data(){
    return {
      showDetailIcon: true,
      // Start data for form of new tournament 
      tournamentData: {
        datetime: null,
        teamsNeeded: [2, 20],
        players_per_team: null,
        game_type: null,
        price: null,
        isNew: true,
      },
      data: [
        { id: 1, team: "Team 1", teamSize: 5, playersPresent: 2, players: [{id: 1, name: 'Loremana 1', points: 124}, {id: 4, name: 'LoremLife', points: 124}] },
        { id: 2, team: "Team 2", teamSize: 5, playersPresent: 5, players: [{id: 2, name: 'Loremana 2', points: 124}, {id: 5, name: 'LoremLife', points: 124}] },
        { id: 3, team: "Team 3", teamSize: 5, playersPresent: 6, players: [{id: 3, name: 'Loremana 3', points: 124}, {id: 6, name: 'LoremLife', points: 124}] },
      ],
    }
  },
  computed: {
    ...mapGetters(['player', 'tournamentError']),  
  },
  mounted(){
    this.fetchTournament();
  },
  created(){
    this.getProfile();
  },
  methods: {
    ...mapActions(['getTournament', 'createTournament', 'updateTournament', 'createTeams', 'getProfile']),

    fetchTournament: async function(){
      const id = this.$route.params.id;

      if(id == 'new'){
        return;
      }
      
      const tournamentData = await this.getTournament(id);      

      if(this.tournamentError){
        console.log(this.tournamentError);
        return;
      }

      delete tournamentData.data.id;
      console.log({fetch: tournamentData.data});
      this.tournamentData = tournamentData.data;

      this.tournamentData.teamsNeeded = [tournamentData.data.min_teams, tournamentData.data.max_teams];

      this.tournamentData.datetime = new Date(this.tournamentData.datetime);
      tournamentData.data.isNew = false;
    },

    submit: async function(formData){
      const data = {...this.tournamentData};

      data.min_teams = data.teamsNeeded[0];
      data.max_teams = data.teamsNeeded[1];

      delete data.teamsNeeded;
      delete data.isNew;

      if(formData.isNew){
        const tournament = await this.newTournament(data);

        this.newTeams(tournament.data.id).then(res => {
          this.$router.push({name: 'Tournaments'});
        }).catch(err => {
          console.log(err);
        })
      } else {
        this.updateTournamentData(data)
      }
    },

    updateTournamentData: async function(data){
      console.log(data);
      await this.updateTournament(data);

      if(this.tournamentError){
        console.log(this.tournamentError);
        return;
      }
    },

    newTournament: async function(data){
      const tournament = await this.createTournament(data);

      if(this.tournamentError){
        console.log(this.tournamentError);
        return;
      }

      return tournament;
    },

    newTeams: async function(id){
      const maxTeams = this.tournamentData.teams[1];
      const teams = [];

      for(var i=1; i <= maxTeams; i++){
        const team = {
          tournament: id,
          team_name: `Team ${i}`,
        }

        teams.push(team);
      }

      await this.createTeams(teams);
    },

    joinTeam: function(id){
      console.log('join team: ', id);
    },
    leaveTeam: function(id){
      console.log('leave team: ' + id);
    },
    loggedInPlayerInTeam: function(players){
      const loggedInPlayerId = this.player.id;

      if(!players){
        return false;
      }
      return players.filter(player => player.id === loggedInPlayerId).length > 0;
    }
  },
}
</script>
