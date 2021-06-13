<template>
  <div class="columns is-multiline">
    <div class="column is-3 is-offset-1">
      <PlayerProfile :player="player"/>
    </div>
    <div class="column is-5 is-offset-2">
      <div class="is-flex-direction-row is-flex">
        <StatsBox title="Latest Team(mate)" value="Lorem Galore" icon="account-multiple"/>
        <StatsBox title="Games Played" value="102" icon="google-controller"/>
        <StatsBox title="Most Wins With" value="Ipsum Mana" icon="account"/>
        <StatsBox title="Points Earned" value="158" icon="currency-usd"/>
      </div>
    </div>

    <div class="column is-8">
      <div class="match-history-wrapper">
        <h3 class="title is-5">Match History</h3>

        <b-table :data="data">
          <b-table-column field="type" label="Type" v-slot="props">
            {{
              props.row.type
            }}
          </b-table-column>
          <b-table-column field="team" label="Team" v-slot="props">
            {{
              props.row.team
            }}
          </b-table-column>
          <b-table-column field="placement" label="Placement" v-slot="props">
            {{
              props.row.placement
            }}
            /
            {{
              props.row.allTeams
            }}
          </b-table-column>
          <b-table-column field="points" label="Points" v-slot="props">
            <span class="has-text-primary">
              {{
                props.row.points
              }}
            </span>
          </b-table-column>
          <b-table-column  field="id" label="" v-slot="props">
            <router-link :to="'/tournament/'+props.row.id" class="is-link">Details</router-link>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StatsBox from '@/components/StatsBox.vue'
import PlayerProfile from '@/components/PlayerProfile.vue'

export default {
  name: 'Home',
  components: {
    StatsBox,
    PlayerProfile,
  },
  data(){
    return {
      player: {
        level: 21,
        currentExp: 52,
        totalExp: 104
      },
      data: [
        { 'id': 1, 'type': "ARAM", 'team': 'Lorem Mana', 'placement': 3, 'allTeams': 10, 'points': '+31', 'details': '' },
        { 'id': 2, 'type': "ARAM", 'team': 'Lorem Mana', 'placement': 3, 'allTeams': 10, 'points': '+31', 'details': '' },
        { 'id': 3, 'type': "ARAM", 'team': 'Lorem Mana', 'placement': 3, 'allTeams': 10, 'points': '+31', 'details': '' },
        { 'id': 4, 'type': "ARAM", 'team': 'Lorem Mana', 'placement': 3, 'allTeams': 10, 'points': '+31', 'details': '' },
        { 'id': 4, 'type': "ARAM", 'team': 'Lorem Mana', 'placement': 3, 'allTeams': 10, 'points': '+31', 'details': '' },
        { 'id': 4, 'type': "ARAM", 'team': 'Lorem Mana', 'placement': 3, 'allTeams': 10, 'points': '+31', 'details': '' },
      ],
    }
  }
}
</script>
