<template>
  <form class="box box--tournament" @submit.prevent="submitTournament">
    <h3 class="title is-5">Tournament Details</h3>
    <b-field label="Start Date and Time">
      <b-datetimepicker required 
        v-model="formData.datetime"
        placeholder="10/07/2021 - 21:00:00..."
        :locale="locale"
        :timepicker="{enableSeconds, hourFormat}"
      >
        <template #right>
          <b-button
            label="Now"
            type="is-primary"
            icon-left="clock"
            @click="formData.datetime = new Date()" 
          />
        </template>

      </b-datetimepicker>
    </b-field>

    <b-field label="Min and Max Teams needed">
      <b-slider required v-model="formData.teamsNeeded" :min="2" :max="20" :step="1" ticks>
      </b-slider>
    </b-field>

    <b-field label="Players per Team">
      <b-numberinput required controls-position="compact" v-model="formData.players_per_team" placeholder="6..." :min="1"></b-numberinput>
    </b-field>

    <b-field label="Game type">
      <b-select placeholder="ARAM..." required size="is-medium" v-model="formData.game_type" message="Please select a game type">
          <option value="aram_draft">ARAM - Draft</option>
          <option value="aram_blind">ARAM - Blind</option>
          <option value="summonersrift_draft">Summoners Rift - Draft</option>
          <option value="summonersrift_blind">Summoners Rift - Blind</option>
      </b-select>
    </b-field>

    <b-field label="Price">
      <b-input required v-model="formData.price" placeholder="3 skins..."></b-input>
    </b-field>

    <b-field>
      <b-button 
        tag="input"
        native-type="submit"
        :value="formData.isNew ? 'Create Tournament' : 'Update Tournament'"
        type="is-primary"
      />
    </b-field>

  </form>
</template>

<script>
export default {
  name: "TournamentForm",
  props: {
    formData: Object,
  },
  data() {
    return {
      enableSeconds: false,
      hourFormat: '24',
      locale: 'en-GB',
    }
  },
  methods: {
    submitTournament: function() {
      this.$emit('submitTournament', this.formData);
    }
  }
}
</script>
