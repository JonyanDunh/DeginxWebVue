<script>
import PubSub from 'pubsub-js'

export default {
  mounted() {
 PubSub.publish('ChangeLeftMenu',[
                {
                    ItemName: "注册账号",
                    ItemIcon: '<svg t="1657885370935" class="h-5 w-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3315" ><path d="M825.2928 392.5504A288.3584 288.3584 0 0 0 536.32 102.4 288.3584 288.3584 0 0 0 247.296 392.5504c0 106.3424 57.7536 203.0592 147.6608 251.392-122.0096 48.384-215.0912 154.7776-240.7936 290.1504-3.2256 16.128 6.4 35.4816 25.7024 38.7072h6.4a31.2832 31.2832 0 0 0 32.1024-25.8048c28.928-151.5008 160.5632-261.12 314.6752-264.3456h6.4c157.3376 0 285.7984-132.1472 285.7984-290.0992z m-513.7408 0c0-125.7472 99.5328-225.6896 224.768-225.6896 125.184 0 224.768 99.9424 224.768 225.6896 0 122.4704-99.584 222.4128-221.5936 225.6384h-9.6256c-122.0096-6.4512-218.3168-106.3936-218.3168-225.6384z m577.9456 415.8464h-64.2048v-64.512c0-19.3024-12.8512-32.2048-32.1024-32.2048-19.3024 0-32.1536 12.9024-32.1536 32.256v64.4608H696.832c-19.2512 0-32.1024 12.9024-32.1024 32.256 0 19.3024 12.8 32.256 32.1024 32.256h64.2048v64.4096c0 19.3536 12.8512 32.256 32.1536 32.256 19.2512 0 32.1024-12.9024 32.1024-32.256v-64.4608h64.2048c19.2512 0 32.1024-12.9024 32.1024-32.256 0-19.3024-12.8-32.256-32.1024-32.256z" p-id="3316"></path></svg>',
                    ItemKey: 0
                },
                {
                    ItemName: "忘记密码",
                    ItemIcon: '<svg t="1657884803924" class="h-5 w-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1550" ><path d="M251.566 759.85c-16.994 0-30.82-13.572-30.82-30.275V451.64h493.14v77.833a196.856 196.856 0 0 1 46.23 9.612V405.409h-585.6v324.166c0 42.262 34.497 76.504 77.05 76.504h263.418a197.072 197.072 0 0 1-13.699-46.23h-249.72z m446.91-354.441h-46.23v-46.24c0-103.956-86.809-184.92-184.921-184.92-100.534 0-184.921 84.368-184.921 184.92v46.24h-46.23v-46.24c0-126.038 105.112-231.16 231.16-231.16 124.454 0 231.16 100.835 231.16 231.16v46.24z" p-id="1551"></path><path d="M459.606 528.69h15.42a23.12 23.12 0 0 1 23.11 23.11v107.88a23.129 23.129 0 0 1-23.138 23.119h-15.41a23.12 23.12 0 0 1-23.12-23.12V551.81a23.156 23.156 0 0 1 23.138-23.12z m237.186 31.939c-91.87 0-166.316 74.465-166.316 166.307 0 91.86 74.456 166.315 166.316 166.315 91.85 0 166.315-74.465 166.315-166.315 0-91.842-74.465-166.307-166.315-166.307z m1.702 287.266c-69.632 0-126.075-56.425-126.075-126.075 0-69.623 56.434-126.066 126.075-126.066s126.075 56.434 126.075 126.066c0 69.65-56.434 126.075-126.075 126.075z" p-id="1552"></path><path d="M693.169 778.363h14.91v13.48h-14.91z" p-id="1553"></path><path d="M684.067 769.26h33.114v31.686h-33.114zM705.23 641.42c-27.908-0.464-45.657 13.253-53.212 41.151h12.06c6.618-22.7 20.325-33.814 41.151-33.341 20.335 1.41 31.458 11.824 33.35 31.22 1.42 10.878-6.38 21.764-23.41 32.632-14.664 9.475-21.763 20.826-21.29 34.06v7.091h12.06v-6.38c-0.473-11.824 4.733-21.045 15.61-27.671 21.29-11.35 31.221-25.068 29.801-41.151-2.375-23.648-17.74-36.19-46.12-37.61z" p-id="1554"></path><path d="M715.042 763.344h-30.265v-16.192c-0.583-16.275 7.973-30.42 25.45-41.707 9.475-6.044 20.47-15.055 19.333-23.802-1.502-15.328-8.957-22.2-24.959-23.32h-0.628c-10.021 0-24.148 2.785-31.148 26.797l-1.911 6.563H640.13l3.113-11.487c8.484-31.321 29.446-47.887 60.63-47.887l1.511 0.009c41.943 2.094 53.048 26.06 55.032 45.802 1.766 20.107-9.876 36.919-34.58 50.099-7.554 4.624-11.14 10.823-10.804 19.27l0.01 15.855z" p-id="1555"></path></svg>',
                    ItemKey: 1
                }]);
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
              <input name="password" id="password" v-model="password" type="password" placeholder="password"
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