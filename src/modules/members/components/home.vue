<template>
  <div class="home">
    <h1 class="title">vueJS is AwesomE!!</h1>
    <div class="form">
      <input class="username" type="text" v-model="username"/>
      <input class="password" type="password" v-model="password"/>
      <button class="submit" @click="submit">submit</button>
    </div>
    <div class="result" :class="{'success': success}">
      {{message}}
    </div>
  </div>
</template>
<script lang="ts">
import axios from 'axios'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  public username: string = ''
  public password: string = ''
  public submitted: boolean = false
  public submitting: boolean = false
  public success: boolean = false
  public message: string = ''
  public submit(): void {
    if (this.submitted || this.submitting) {
      // bypass
      return
    }
    this.submitting = true
    axios.post('/api/submit', {
      username: this.username,
      password: this.password
    }).then((res) => {
      this.submitting = false
      this.submitted = true
      this.success = true
      this.message = res.data.message
      this.username = ''
      this.password = ''
    })
  }
}
</script>
