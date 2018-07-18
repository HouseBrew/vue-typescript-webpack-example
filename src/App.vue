<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  @Component({
    name: 'app'
  })
  export default class Leto extends Vue {
    public beforeCreate(): void {
      console.log('beforeCreate')
      // this.$store.dispatch('profile/getProfile')
    }
  }
</script>
<style lang="stylus" scoped>
  iframe
    border none
  .top-tool-bar
    position fixed !important
    z-index 1
</style>
