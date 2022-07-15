<script>
import PubSub from 'pubsub-js'
export default {
    mounted() {
        PubSub.publish('ChangeLeftMenu', [
            {
                ItemName: "热门",
                ItemKey: 0
            },
            {
                ItemName: "程序员",
                ItemKey: 1
            },
            {
                ItemName: "游戏",
                ItemKey: 2
            },
            {
                ItemName: "人工智能",
                ItemKey: 3
            },
            {
                ItemName: "区块链",
                ItemKey: 4
            },
            {
                ItemName: "大数据",
                ItemKey: 5
            }]);
    }
}
</script>

<template>


    <div class="flex flex-wrap justify-start">

        <div class="card w-80  glass shadow-xl m-2">
            <figure class="px-10 pt-10">
                <img src="https://placeimg.com/400/225/arch" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">钓鱼链接生成器</h2>
                <p>钓骗子专用，提供精准ip定位</p>
                <div class="card-actions">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>

        <div class="card w-80 glass m-2">
            <figure><img src="https://message.biliimg.com/bfs/im/94532f85253e3af31ac677b8e8fe89bf88d3749a.jpg"
                    alt="car!"></figure>
            <div class="card-body">
                <h2 class="card-title">Websocket中转站</h2>
                <p>提供websocket打洞服务</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>

        <div class="card w-80 bg-base-100 shadow-xl image-full m-2">
            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">哔哩哔哩透明头像上传</h2>
                <p>干翻陈睿</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>


        <div class="card lg:card-side bg-base-100 shadow-xl m-2">
            <figure><img class="h-full" src="https://placeimg.com/400/400/arch" alt="Album"></figure>
            <div class="card-body">
                <h2 class="card-title">Covid-19趋势预测</h2>
                <p>基于深度学习的疫情数据预测</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>


        <div class="card card-side bg-base-100 shadow-xl m-2">
            <figure><img class="h-full" src="https://placeimg.com/200/280/arch" alt="Movie"></figure>
            <div class="card-body">
                <h2 class="card-title">SSL泛域名证书生成</h2>
                <p>生成Let's Encrypt SSL证书，最多支持48个域名共用</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>


        <div class="card w-80 bg-base-100 shadow-xl m-2">
            <div class="card-body">
                <h2 class="card-title">QQ群机器人接入</h2>
                <p>基于Mirai的QQ机器人,最多可添加进10个群</p>
            </div>
            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
        </div>

        <div class="card w-80 bg-primary text-primary-content m-2">
            <div class="card-body">
                <h2 class="card-title">AI换脸</h2>
                <p>基于Tensorflow+Opencv的人脸替换</p>
                <div class="card-actions justify-end">
                    <button class="btn">免费试用</button>
                </div>
            </div>
        </div>



    </div>



</template>