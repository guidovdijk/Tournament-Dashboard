<template>
  <div class="columns">
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
      }
    }
  }
}
</script>
