<script>
import PubSub from 'pubsub-js'
export default {
    mounted() {
        PubSub.publish('ChangeLeftMenu', [
            {
                ItemName: "所有",
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
        PubSub.publish('ChangeButtonStauts', "Tools");
        PubSub.publish('ChangeLeftMenuItemStauts', 0);
    },

    data() {
        return {
            ToolsItems: [
                {
                    ItemName: "Websocket中转站",
                    ItemImg: "https://message.biliimg.com/bfs/im/d55898984e3ed5949e3d083e65228b43579683be.png",
                    ItemDescrible: "提供Websocket打洞服务,支持多方订阅多方消息发送"
                },
                {
                    ItemName: "Covid-19趋势预测",
                    ItemImg: "https://th.bing.com/th/id/R.814b05d8d6baac36f24c9a8428cdaefc?rik=ENv5akS8shlHpA&riu=http%3a%2f%2fcidoc.mini.icom.museum%2fwp-content%2fuploads%2fsites%2f6%2f2020%2f05%2f200309-D-HN545-003.jpg&ehk=MxhRzMDEBNKgToe9asbuVKWDoQxJhbeJjKhOC27MZ5I%3d&risl=&pid=ImgRaw&r=0",
                    ItemDescrible: "基于深度学习的疫情预测,模型数据来自国家卫健委"
                },
                {
                    ItemName: "Bilibili透明头像上传",
                    ItemImg: "https://media.sketchfab.com/models/2dbf7c52ea6a4d6c832897eea98d5467/thumbnails/a9e69fc4a33e41998513848db9feeda8/b5c6e3d229ec41a7b58d34c015aa9e50.jpeg",
                    ItemDescrible: "懂的都懂,叔叔把动态头像封了,透明/半透明头像总不会不给吧"
                }, {
                    ItemName: "SSL泛域名证书生成",
                    ItemImg: "https://codebriefly.com/wp-content/uploads/2019/02/lets-encrypt.jpg",
                    ItemDescrible: "在线生成Let's Encrypt的SSL泛域名证书,最多可支持48个域名共用一个证书"
                },
                {
                    ItemName: "Youtube视频分享",
                    ItemImg: "https://ifa2019warsaw.com/wp-content/uploads/2020/08/6.jpg",
                    ItemDescrible: "一键把Youtube视频分享到QQ空间、微博、哔哩哔哩、朋友圈"
                },
            ]
        }
    },
}
</script>

<template>


    <div class="flex flex-wrap justify-start">
        <div v-for="item in ToolsItems">
            <div class="card rounded-lg  w-72 bg-base-100 m-2">
                <figure>
                    <img :src="item.ItemImg">
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ item.ItemName }}</h2>
                    <p style="overflow:scroll" class="h-20">{{ item.ItemDescrible }}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">立即使用</button>
                    </div>
                </div>
            </div>

        </div>

    </div>



</template>