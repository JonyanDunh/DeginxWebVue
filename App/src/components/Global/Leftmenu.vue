<script>
import PubSub from 'pubsub-js'
import { onMounted, ref } from 'vue'
export default {

    data() {
        return {
            LeftMenuItems: [],
            beforeTarget: {},
        }
    },
    mounted() {

        PubSub.subscribe('ChangeLeftMenu', (msg, Items) => {
            this.LeftMenuItems = Items
        });
        PubSub.subscribe('ChangeLeftMenuItemStauts', (msg, Items) => {

            document.getElementById('LeftMenuItem_' + Items).classList.add("active");
            //判断是否重复点击
            if (document.getElementById('LeftMenuItem_' + Items) !== this.beforeTarget) {
                //判断，若为第一次点击，则不进行修改
                if (Object.keys(this.beforeTarget).length > 0) {

                    this.beforeTarget.classList.remove("active");
                }
                //将上次点击的按钮存储
                this.beforeTarget = document.getElementById('LeftMenuItem_' + Items);
            }

        });
    },
    methods: {
        selectTime(e, ItemType) {

            PubSub.publish('ChangeToolsView', ItemType);
            //给点击选中的按钮添加选中效果
            e.currentTarget.classList.add("active");
            //判断是否重复点击
            if (e.currentTarget !== this.beforeTarget) {
                //判断，若为第一次点击，则不进行修改
                if (Object.keys(this.beforeTarget).length > 0) {

                    this.beforeTarget.classList.remove("active");
                }
                //将上次点击的按钮存储
                this.beforeTarget = e.currentTarget;
            }
        },
    }
}

</script>

<template>
    <div class="sm:w-72 w-full">
        <ul id="menu" class="menu  md:flex bg-base-100 sm:w-72  w-full  p-2 rounded-lg  ">
            <li v-for="item in LeftMenuItems">
                <a :id="'LeftMenuItem_' + item.ItemKey" @click="selectTime($event, item.ItemType)">
                    <!-- <span v-html="item.ItemIcon"></span> -->
                    {{ item.ItemName }}
                    <div style="float:right;" v-show="item.ItemChildAmount != null"
                        class="badge badge-secondary absolute  right-4">{{ item.ItemChildAmount }}</div>
                </a>

            </li>
        </ul>
    </div>
</template>