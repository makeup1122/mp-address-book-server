<template>
    <v-app id="app">
        <v-toolbar color="blue-grey" app>
            <router-link to="/web/index">
            <v-toolbar-title  class="white--text">
                Manager
            </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid>
            <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer color="blue-grey" class="white--text" app>
            <span>Address Book Manager</span>
            <v-spacer></v-spacer>
            <span>&copy; 2018</span>
            </v-footer>
    </v-app>  
</template>
<script>
export default {
    
}
</script>
