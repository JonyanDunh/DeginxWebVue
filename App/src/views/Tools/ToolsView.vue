<script>
import PubSub from 'pubsub-js'
var Type2Name = { all: "所有", Programmer: "程序员", VideoWebSite: "视频网站", Other: "其他" }

export default {

    mounted() {
        try {
            this.$GLOBAL.axios.get('http://127.0.0.1:8000/api/tools/get')
                .then((res) => {
                    this.ToolsItems["all"] = []
                    for (var data of res.data.data) {
                        this.ToolsItems["all"].push(data["map"])
                        if (this.ToolsItems[data["map"]["ItemType"]] == null)
                            this.ToolsItems[data["map"]["ItemType"]] = [];
                        this.ToolsItems[data["map"]["ItemType"]].push(data["map"])
                    }
                    var times = 0;
                    var LeftMenu = [];
                    for (var data in this.ToolsItems) {
                        LeftMenu.push({ ItemName: Type2Name[data], ItemKey: times, ItemType: data, ItemChildAmount: this.ToolsItems[data].length })

                    }
                    PubSub.publish('ChangeLeftMenu', LeftMenu);
                    PubSub.publish('ChangeLeftMenuItemStauts', 0);
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (err) {
            //处理错误
        }

        PubSub.publish('ChangeButtonStauts', "Tools");

        PubSub.subscribe('ChangeToolsView', (msg, ItemType) => {

            this.ItemType = ItemType

        });
    },

    data() {
        return {
            ToolsItems: {},
            ItemType: "all"
        }
    },
    methods: {
        UseTool(ItemUUID) {
            this.$router.push('/tools/'+ItemUUID)
                
        },
    }
}
</script>

<template>


    <div class="flex flex-wrap justify-center sm:justify-start">
        <div v-for="item in ToolsItems[ItemType]">
            <div class="card rounded-lg w-auto sm:w-72 bg-base-100 m-2">
                <figure>
                    <img :src="item.ItemImg">
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ item.ItemName }}</h2>
                    <p style="overflow:scroll" class="h-20">{{ item.ItemDescribe }}</p>
                    <div class="card-actions justify-end">
                        <button :disabled='item.disabled' class="btn  btn-primary"
                            @click="UseTool(item.ItemUUID)">立即使用</button>
                    </div>
                </div>
            </div>

        </div>

    </div>



</template>