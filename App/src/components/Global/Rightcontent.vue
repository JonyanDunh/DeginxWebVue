<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
let windowHeight = parseInt(window.innerHeight)
export default {
    methods: {

    },
    mounted() {
        const that = this
        window.onresize = () => {
            return (() => {
                var header_height = document.getElementById("header").offsetHeight;
                document.getElementById("content").style.top = (header_height - 105) + "px";
            })()
        }
    }
}

</script>
<style>
@media (min-width: 640px) {
    .right-content {
        margin: -0.5rem;
    }
}
</style>
<template>
    <div id="content" @load="SetTop"
        class=" sm:static sm:w-full  absolute bottom-4 left-4 right-4 right-content  overflow-auto rounded-lg" >
        <RouterView></RouterView>
    </div>
</template>