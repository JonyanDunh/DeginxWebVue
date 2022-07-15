<script setup>
import Navbar from '@/components/Navbar.vue'
import Leftmenu from '@/components/Leftmenu.vue'
import Rightcontent from '@/components/Rightcontent.vue'
import { createApp } from 'vue'


</script>


<style>
</style>
<template>
  <div id="header" class="header w-full p-4">
    <Navbar ></Navbar>
  </div>
  <div style="top:100px;justify-content: ;"
    class=" content w-full flex absolute bottom-0  p-4 pt-0 flex-wrap sm:flex-nowrap">
    <div class="hidden sm:block">
    <Leftmenu ref="menu" class="sm:mr-4"></Leftmenu>
    </div>
    <Rightcontent ></Rightcontent>
  </div>
</template>

<script>

export default {
  methods: {
    indexs: function () {
      setTimeout(function () {
        var header_height = document.getElementById("header").offsetHeight;
        document.getElementById("content").style.top = (header_height-105) + "px";
      }, 300);
    }
  },
  mounted() {
    //自动加载indexs方法
    this.indexs();
  }
}
</script>