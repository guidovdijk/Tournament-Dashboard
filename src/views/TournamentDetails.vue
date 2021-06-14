<template>
  <div class="columns is-multiline is-align-items-center">
    <div class="column is-12 is-flex is-justify-content-space-between is-align-items-center">
      <router-link :to="'/'" class="is-link has-text-grey-lighter">Back to home</router-link>
    </div>
    <div class="column is-8">
      <div class="box box--table">
        <h3 class="title is-5">Tournaments</h3>

        <b-table 
        :data="data" 
        :mobile-cards="false" 
        detailed
        custom-detail-row
        :show-detail-icon="showDetailIcon"
        detail-key="id"
        class="is-large table--teams">
          <b-table-column field="type" label="Type" v-slot="props">
            {{
              props.row.team
            }}
          </b-table-column>
          <b-table-column field="teamSize" label="Team size" v-slot="props">
            {{
              props.row.teamSize
            }}
            /
            {{
              props.row.playersPresent
            }}
          </b-table-column>
          <b-table-column  field="id" label="" cell-class="has-text-right" v-slot="props">
            <b-button class="table__button-fix" type="is-primary" @click="joinTeam(props.row.id)">Join</b-button>
          </b-table-column>

          <template slot="detail" slot-scope="props">
            <tr class="table--teams__players" >
              <td colspan="4" class="table--teams__players__table-wrapper">

            
                <table>
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

              </td>
     
            </tr>
          </template>
        </b-table>
      </div>
    </div>
    <div class="column is-3">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'TournamentDetails',
  components: {

  },
  data(){
    return {
      showDetailIcon: true,
      data: [
        { id: 1, team: "Team 1", teamSize: 5, playersPresent: 2, players: [{id: 1, name: 'Loremana 1', points: 124}, {id: 4, name: 'LoremLife', points: 124}] },
        { id: 2, team: "Team 2", teamSize: 5, playersPresent: 2, players: [{id: 2, name: 'Loremana 2', points: 124}, {id: 5, name: 'LoremLife', points: 124}] },
        { id: 3, team: "Team 3", teamSize: 5, playersPresent: 2, players: [{id: 3, name: 'Loremana 3', points: 124}, {id: 6, name: 'LoremLife', points: 124}] },
      ],
    }
  },
  methods: {
    joinTeam: function(id){
      console.log(id);
    }
  }
}
</script>
