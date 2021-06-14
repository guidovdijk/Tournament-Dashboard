<template>
  <div class="columns is-multiline is-align-items-center">
    <div class="column is-9 is-flex is-justify-content-space-between is-align-items-center">
      <router-link :to="'/'" class="is-link has-text-grey-lighter">Back to home</router-link>
      <router-link :to="'/tournaments/new'" class="button is-primary">New Tournament</router-link>
    </div>
    <div class="column is-9">

      <div class="match-history-wrapper">
        <h3 class="title is-5">Tournaments</h3>

        <b-table :data="data" :mobile-cards="false" class="is-large">
          <b-table-column field="type" label="Type" v-slot="props">
            {{
              props.row.type
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
          <b-table-column field="status" label="Status" v-slot="props">
            {{
              props.row.status
            }}
          </b-table-column>
          <b-table-column field="price" label="Price" v-slot="props">
              {{
                props.row.price
              }}
          </b-table-column>
          <b-table-column  field="id" label="" v-slot="props">
            <router-link :to="'/tournament/'+props.row.id" class="is-link has-text-grey-lighter">Details</router-link>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Tournaments',
  components: {

  },
  data(){
    return {
      data: [
        { 'id': 1, 'type': "ARAM", 'teamSize': 5, 'playersPresent': 2, 'status': 3, 'price': '3 skins', 'details': '' },
        { 'id': 2, 'type': "ARAM", 'teamSize': 5, 'playersPresent': 2, 'status': 3, 'price': '3 skins', 'details': '' },
        { 'id': 3, 'type': "ARAM", 'teamSize': 5, 'playersPresent': 2, 'status': 3, 'price': '3 skins', 'details': '' },
        { 'id': 4, 'type': "ARAM", 'teamSize': 5, 'playersPresent': 2, 'status': 3, 'price': '3 skins', 'details': '' },
        { 'id': 4, 'type': "ARAM", 'teamSize': 5, 'playersPresent': 2, 'status': 3, 'price': '3 skins', 'details': '' },
        { 'id': 4, 'type': "ARAM", 'teamSize': 5, 'playersPresent': 2, 'status': 3, 'price': '3 skins', 'details': '' },
      ],
    }
  }
}
</script>
