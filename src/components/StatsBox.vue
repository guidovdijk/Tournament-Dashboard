<template>
  <div class="box box--stats">
    <b-icon
      :icon="icon"
      size="is-medium">
    </b-icon>
    <h6 class="title is-7">{{title}}</h6>
    <h5 class="subtitle is-6">{{value}}</h5>
  </div>
</template>

<script>
export default {
  name: "StatsBox",
  props: {
    title: String,
    value: String,
    icon: String,
  }
}
</script>