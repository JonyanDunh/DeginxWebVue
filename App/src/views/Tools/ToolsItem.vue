<script>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
export default {
    setup() {
        const route = useRoute()

        onMounted(() => {
            alert(route.params.ItemUUID)
            const id = route.params.ItemUUID
        })
    }
}</script>
<template>
    <div>User {{ $route.params.id }}</div>
</template>