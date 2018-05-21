<template>
<v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Username" type="text" v-model="username"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="onBtnSubmit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-alert
      :value="alert"
       v-model="alert"
       dismissible
      type="error"
      transition="scale-transition"
    >
      {{message}}
    </v-alert>
  </v-app>
</template>
<script>
import { login } from '@/api/login'
export default {
  data() {
    return {
      username: '',
      password: '',
      alert: false,
      message: 'success'
    }
  },
  methods: {
    onBtnSubmit(){
      login(this.username,this.password).then(res=>{
        this.$router.push('/web/index')
      }).catch(err=>{
        this.message = err.message
        this.alert = true
      })
    }
  }
}
</script>
