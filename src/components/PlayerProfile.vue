<template>
  <div class="block">
    <article class="media media--player-profile">
      <figure class="media-left">
        <p class="image is-80x80">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h4 class="title">John Doe</h4>
          <p class="has-text-grey-lighter">
            Last match {{lastMatchInDays}} days ago.
          </p>
        </div>
      </div>
      <div class="media-footer level">
        <div class="level-left">
          <p class="has-text-weight-bold has-text-grey-light">Lvl {{player.level}}</p>
          <b-progress :value="levelProgress"></b-progress>
          <p class="has-text-weight-normal has-text-grey-light">{{player.currentExp}} / {{player.totalExp}}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "PlayerProfile",
  props: {
    lastMatchInDays: Number,
    player: Object
  },
  computed: {
    levelProgress: function(){
      const {currentExp, totalExp} = this.player;
      return (currentExp / totalExp) * 100;
    }
  }
}
</script>