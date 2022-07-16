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
<div class="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">钓鱼链接生成器</h2>
    <p>钓，就硬钓</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">试用</button>
    </div>
  </div>
</div>

</template>