<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      left
      clipped
      app
    >
      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer left </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
     <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="onLeftMenuClick"></v-toolbar-side-icon>
      <v-toolbar-title>Menu12</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-footer color="blue-grey" class="white--text" app>
      <span>Address Book Manager</span>
      <v-spacer></v-spacer>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      left: null
    }
  },
  mounted: ()=>{
    // console.log('mounted')
  },
  methods: {
    onLeftMenuClick(){
      this.drawer = !this.drawer
    }
  },
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', 1)
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.$store.state.items[1]
    }
  }
}
</script>
