<script>
import PubSub from 'pubsub-js'

export default {
    data() {
        return {
            LeftMenuItems: []
        }
    },
    mounted() {
        PubSub.subscribe('ChangeLeftMenu', (msg,Items) => {
            this.LeftMenuItems=Items
        });
    }


}

</script>

<template>
    <div class="sm:w-72 w-full">
        <ul id="menu" class="menu  md:flex bg-base-100 sm:w-72  w-full  p-2 rounded-lg  ">
            <li v-for="item in LeftMenuItems">
                <a>
                    <span v-html="item.ItemIcon"></span>
                    {{ item.ItemName }}
                </a>
            </li>
        </ul>
    </div>
</template>