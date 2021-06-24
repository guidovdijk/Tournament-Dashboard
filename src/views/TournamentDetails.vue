<template>
  <div class="columns is-multiline">
    <div class="column is-12 is-flex is-justify-content-space-between is-align-items-center">
      <router-link :to="'/'" class="is-link has-text-grey-lighter">Back to home</router-link>
    </div>
    <div class="column is-8">
      <div class="box box--table">
        <h3 class="title is-5">Tournament Teams</h3>
        <b-table :data="tournamentData.teams" :mobile-cards="false" detailed custom-detail-row
          :show-detail-icon="showDetailIcon" detail-key="_id" class="is-large table--teams table-large">
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
          <b-table-column field="id" label="" cell-class="has-text-right" v-slot="props">
            <template v-if="loggedInPlayerInTeam(props.row.players)">
              <b-button class="table__button-fix" type="is-danger" @click="leaveTeam(props.row), update()">
                Leave
              </b-button>
            </template>
            <template v-else>
              <b-button class="table__button-fix" type="is-primary" @click="joinTeam(props.row), update()"
                :disabled="props.row.teamSize <= props.row.playersPresent">
                Join
              </b-button>
            </template>
          </b-table-column>

          <template slot="detail" slot-scope="props">
            <tr class="table--teams__players">
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
                    <tr v-for="player in props.row.players" :key="'player-'+player._id">
                      <td>{{player.name}} <span
                          class="is-italic">{{isEqualToLoggedInPlayer(player._id) ? '(you)' : ''}}</span></td>
                      <td>{{player.points}}</td>
                      <td></td>
                      <td class="has-text-right">
                        <b-button v-if="isAdmin && !isEqualToLoggedInPlayer(player._id)" type="is-danger"
                          size="is-medium" class="button--with-icon" icon-right="delete"
                          @click="activatePlayerModal(player, props.row)" />
                      </td>
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
      <div class="box">
        <h3 class="title is-5 mb-3">Free-agent list</h3>
        <div class="mb-4 is-flex align-items-center is-justify-content-space-between">
          <p>Join the tournament as a
            <b-tooltip :label="this.freeAgentText" size="is-small" multilined>
              <b-icon icon="help-circle-outline" size="is-small">
              </b-icon>
              <span class="has-text-grey-lightbis"> free-agent</span>
            </b-tooltip>.
            <br>You can always pick a team later, or get assigned a team by an admin.
          </p>
          <b-button v-if="!isFreeAgent" @click="joinFreeAgents(), update()" type="is-primary">Join as free-agent</b-button>
          <b-button v-else @click="leaveFreeAgents(), update()" type="is-danger">Leave free-agent</b-button>
        </div>
        <b-table
          :data="tournamentData.free_agents" 
          :mobile-cards="false" 
          :striped="true"
        >
          <b-table-column field="name" label="Player name" v-slot="props">
            {{
              props.row.name
            }}
            <span class="is-italic">
              {{isEqualToLoggedInPlayer(props.row._id) ? '(you)' : ''}}
            </span>
          </b-table-column>
          <b-table-column field="points" label="Points Earned" v-slot="props">
            {{
              props.row.points
            }}
          </b-table-column>
          <b-table-column v-slot="props" cell-class="has-text-right">
            <b-button v-if="isAdmin && !isEqualToLoggedInPlayer(player._id)" type="is-danger"
              size="is-medium" class="button--with-icon" icon-right="delete"
              @click="leaveFreeAgents(props.row), update()"
            />
          </b-table-column>
          <template #empty>
            <div class="has-text-centered py-6">No free-agents present</div>
          </template>
        </b-table>
      </div>
    </div>
    <div class="column is-4">
      <TournamentForm :formData="tournamentData" @submitTournament="submit" />
    </div>
    <b-modal v-model="playerModal.isActive" :width="540" scroll="keep">
      <div class="box box--black-bis">
        <div class="box-content" v-if="playerModal.player">
          <h3 class="title is-5">Player: {{playerModal.player.name}}</h3>
          <p class="">
            Do you want to make <span class="has-text-weight-semibold	">{{playerModal.player.name}}</span> a
            <b-tooltip :label="this.freeAgentText" size="is-small" multilined>
              <b-icon icon="help-circle-outline" size="is-small">
              </b-icon>
              <span class="has-text-grey-lightbis"> free-agent</span>
            </b-tooltip>

            ,<br>
            or remove him entirely from the tournament?
          </p>
          <div class="buttons mt-5">
            <b-button type="is-primary" @click="leaveTeam(playerModal.team, playerModal.player), joinFreeAgents(playerModal.player), update()">Change to free-agent</b-button>

            <b-button type="is-danger" @click="leaveTeam(playerModal.team, playerModal.player), update()">Delete from tournament</b-button>
          </div>
        </div>
      </div>
    </b-modal>
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
      freeAgentText: "A free-agent is a player that is not present in any team, but can be placed in a team, by an admin or by picking a team themselves.",
      showDetailIcon: true,
      playerModal: {
        isActive: false,
        player: null
      },
      // Start data for form of new tournament 
      tournamentData: {
        datetime: null,
        teamsNeeded: [2, 20],
        players_per_team: null,
        game_type: null,
        price: null,
        isNew: true,
        free_agents: []
      },
    }
  },
  computed: {
    ...mapGetters(['player', 'tournamentError']),

    isAdmin: function(){
      return this.player.role == 'admin';
    },

    isFreeAgent: function(){
      if(this.tournamentData.free_agents && this.tournamentData.free_agents.length == 0) { 
        return false;
      }

      return this.tournamentData.free_agents.filter(p => p._id == this.player._id).length > 0;
    },
  },
  mounted(){
    this.fetchTournament();
  },
  created(){
    this.getProfile();
    console.log(this.player)
  },
  methods: {
    ...mapActions(['getTournament', 'createTournament', 'updateTournament', 'createTeams', 'getProfile', 'addPlayer', 'deletePlayer']),

    isEqualToLoggedInPlayer: function(id){
      return this.player._id == id;
    },

    activatePlayerModal(player, team) {
      this.playerModal.isActive = true;
      this.playerModal.player = player;
      this.playerModal.team = team;
    },

    fetchTournament: async function(){
      const id = this.$route.params.id;

      console.log("fetch");

      if(id == 'new'){
        return;
      }
      
      const tournamentData = await this.getTournament(id);      

      console.log(tournamentData);

      if(this.tournamentError){
        console.log(this.tournamentError);
        return;
      }

      delete tournamentData.data.id;

      this.tournamentData = tournamentData.data;
      this.tournamentData.teamsNeeded = [tournamentData.data.min_teams, tournamentData.data.max_teams];
      this.tournamentData.datetime = new Date(this.tournamentData.datetime);

      tournamentData.data.isNew = false;
    },

    submit: async function(formData){
      console.log(formData);
      const data = {...formData};
      data.min_teams = data.teamsNeeded[0];
      data.max_teams = data.teamsNeeded[1];

      delete data.teamsNeeded;

      if(formData.isNew){
        data.teams = this.newTeams();

        const tournament = await this.newTournament(data);

        if(this.tournamentError){
          console.log(this.tournamentError);
          return;
        }

        this.$router.push({name: 'Tournaments'});
      } else {
        const response = await this.updateTournamentData(data)
        console.log(response);
      }
    },

    updateTournamentData: async function(data){
      console.log(data);
      delete data.teams;
      const response = await this.updateTournament(data);

      if(this.tournamentError){
        console.log(this.tournamentError);
        return;
      }

      return response;
    },

    newTournament: async function(data){
      const tournament = await this.createTournament(data);

      if(this.tournamentError){
        console.log(this.tournamentError);
        return;
      }

      return tournament;
    },

    newTeams: function(){
      console.log(this.tournamentData);
      const maxTeams = this.tournamentData.teamsNeeded[1];
      const teams = [];

      for(var i=1; i <= maxTeams; i++){
        const team = {
          team_name: `Team ${i}`,
        }

        teams.push(team);
      }

      return teams;
    },

    joinTeam: async function(team, player = this.player){
      this.tournamentData.teams.forEach(t => {
        const isInTeam = this.loggedInPlayerInTeam(t.players);

        if(isInTeam){
          this.leaveTeam(t);
        }
      });

      this.leaveFreeAgents(player);
      
      team.players.push(player);
    },

    update: async function(){
      const response = await this.updateTournament(this.tournamentData);
    },

    joinFreeAgents: async function(player = this.player){
      this.tournamentData.free_agents.push(player);
    },

    leaveFreeAgents: async function(player = this.player){
      const removeIndex = this.tournamentData.free_agents.map(p => p._id).indexOf(player._id);

      if(removeIndex > -1){
        this.tournamentData.free_agents.splice(removeIndex, 1);
      }
    },

    leaveTeam: async function(team, player = this.player){
      const removeIndex = team.players.map(p => p._id).indexOf(player._id);

      if(removeIndex > -1){
        team.players.splice(removeIndex, 1);
      }
    },

    loggedInPlayerInTeam: function(players){
      const loggedInPlayerId = this.player._id;

      if(!players){
        return false;
      }
      
      return players.filter(player => player._id === loggedInPlayerId).length > 0;
    }
  },
}
</script>
