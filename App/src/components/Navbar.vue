<script>
import PubSub from 'pubsub-js'

export default {

  data() {
    return {
      items: [{ ItemName: "Login", ItemKey: 1 }, { ItemName: "Register", ItemKey: 3 }],
      AvatarUrl: "https://message.biliimg.com/bfs/im/a0859bbfc2e245ab6b98838051886da9b89e86d8.png"
    }
  },
  mounted() {
    PubSub.subscribe('LoginSuccess', () => {
      this.items = [{ ItemName: this.$GLOBAL.user.username, ItemKey: 0 }, { ItemName: "Logout", ItemKey: 2 }]
      this.AvatarUrl = this.$GLOBAL.user.avatar
      this.$cookies.set("is_login",true)

    });
    this.$GLOBAL.axios.get('http://127.0.0.1:8000/api/account/user/')
      .then((res) => {
        this.$GLOBAL.user = res.data.data
        this.items = [{ ItemName: res.data.data.username, ItemKey: 0 }, { ItemName: "Logout", ItemKey: 2 }]
        this.AvatarUrl = res.data.data.avatar
        this.$cookies.set("is_login",true)
      })
      .catch((err) => {
        if (err.response.data.code == 401) {
          this.$cookies.set("is_login",false)
          console.log(err.response.data.data)
        } else {
          console.log(err.response.data)

        }
      })
  },

  methods: {
    ItemAction(item) {
      switch (item) {
        case 1:
          this.$router.push('/login')
          break;
        case 2:
          this.$GLOBAL.axios.get('http://127.0.0.1:8000/api/account/login/out')
          this.items = [{ ItemName: "Login", ItemKey: 1 }, { ItemName: "Register", ItemKey: 3 }]
          this.AvatarUrl = "https://message.biliimg.com/bfs/im/a0859bbfc2e245ab6b98838051886da9b89e86d8.png"
          this.$cookies.set("is_login",false)
          this.$router.push('/login')
          break;
      }
    },
    toindex: function () {
      this.$router.push('/')
    },
    tologin: function () {
      this.$router.push('/console')
    }
  }

}
</script>
<style>
.navbar {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}
</style>
<template id="navbar" >
  <div class="navbar w-full text-neutral-content  rounded-lg">
    <div class="flex-none sm:hidden">
      <label for="my-drawer-3" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">DeginX</a>
    </div>
    <div class="flex-none gap-2">
      <button class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <button v-on:click="toindex" class="btn btn-active btn-ghost hidden sm:block">
        主页
      </button>
      <button class="btn btn-ghost hidden sm:block">博客</button>
      <button class="btn btn-ghost hidden sm:block">关于</button>
      <button class="btn btn-ghost btn-circle hidden sm:block">
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
      <button v-on:click="tologin" class="btn btn-accent">
        控制台
      </button>

      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img :src="AvatarUrl" />
          </div>
        </label>
        <ul tabindex="0" id="AvatarMenu"
          class="mt-3 p-2 text-black shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li v-for="item in items">
            <a :key="item.ItemKey" @click="ItemAction(item.ItemKey)">{{ item.ItemName }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

