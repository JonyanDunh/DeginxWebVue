<script>
import PubSub from 'pubsub-js'

export default {
  mounted() {
    PubSub.publish('ChangeButtonStauts', "Console");
    PubSub.publish('ChangeLeftMenu', [
      {
        ItemName: "我的收藏",
        ItemKey: 0
      },
      {
        ItemName: "接口配置",
        ItemKey: 1
      },
      {
        ItemName: "插件上传",
        ItemKey: 2
      }]);
  }


}

</script>

<template  >

<div class="h-80 grid grid-cols-3 grid-flow-col ">
<div class="bg-base-100 m-2 rounded-lg ">
  <div  class="avatar  ">
  <div class="w-36 rounded ">
    <img class="" src="https://placeimg.com/192/192/people" />
  </div>
</div>

</div>
<div class="bg-base-100 m-2 rounded-lg">1</div>
<div class="bg-base-100 m-2 rounded-lg">1</div>


  </div>

</template>