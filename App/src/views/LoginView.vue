<script>
import PubSub from 'pubsub-js'

export default {
  mounted() {

  },
  methods: {
    submitForm() {
      const paramsList = new URLSearchParams(new FormData(document.getElementById("loginForm")))
      this.$GLOBAL.axios.post('http://127.0.0.1:8000/api/account/login/', paramsList, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then((res) => {
        this.$GLOBAL.user = res.data.data
        PubSub.publish('LoginSuccess');
        this.$cookies.set("is_login",true)
        this.$router.push('/console')
      })
        .catch((err) => {
          console.log(err.response.data) //错误信息
        })
    }
  }
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      </div>
      <form id="loginForm" @submit.prevent="submitForm">
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">password or Username</span>
              </label>
              <input name="username" type="text" id="username" v-model="username" placeholder="password or username"
                class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input name="password" id="password" v-model="password" type="text" placeholder="password"
                class="input input-bordered" />
              <label class="label">
                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>