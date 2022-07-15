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

        <div class="card w-96 glass m-2">
            <figure><img src="https://message.biliimg.com/bfs/im/94532f85253e3af31ac677b8e8fe89bf88d3749a.jpg"
                    alt="car!"></figure>
            <div class="card-body">
                <h2 class="card-title">钓鱼链接生成器</h2>
                <p>钓骗子专用，提供精准ip定位</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>

        <div class="card w-96 glass m-2">
            <figure><img src="https://message.biliimg.com/bfs/im/94532f85253e3af31ac677b8e8fe89bf88d3749a.jpg"
                    alt="car!"></figure>
            <div class="card-body">
                <h2 class="card-title">钓鱼链接生成器</h2>
                <p>钓骗子专用，提供精准ip定位</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>

        <div class="card w-96 glass m-2">
            <figure><img src="https://message.biliimg.com/bfs/im/94532f85253e3af31ac677b8e8fe89bf88d3749a.jpg"
                    alt="car!"></figure>
            <div class="card-body">
                <h2 class="card-title">钓鱼链接生成器</h2>
                <p>钓骗子专用，提供精准ip定位</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>


        <div class="card w-96 glass m-2">
            <figure><img src="https://message.biliimg.com/bfs/im/94532f85253e3af31ac677b8e8fe89bf88d3749a.jpg"
                    alt="car!"></figure>
            <div class="card-body">
                <h2 class="card-title">钓鱼链接生成器</h2>
                <p>钓骗子专用，提供精准ip定位</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>


        <div class="card w-96 glass m-2">
            <figure><img src="https://message.biliimg.com/bfs/im/94532f85253e3af31ac677b8e8fe89bf88d3749a.jpg"
                    alt="car!"></figure>
            <div class="card-body">
                <h2 class="card-title">钓鱼链接生成器</h2>
                <p>钓骗子专用，提供精准ip定位</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>


        <div class="card w-96 glass m-2">
            <figure><img src="https://message.biliimg.com/bfs/im/94532f85253e3af31ac677b8e8fe89bf88d3749a.jpg"
                    alt="car!"></figure>
            <div class="card-body">
                <h2 class="card-title">钓鱼链接生成器</h2>
                <p>钓骗子专用，提供精准ip定位</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>

        <div class="card w-96 glass m-2">
            <figure><img src="https://message.biliimg.com/bfs/im/94532f85253e3af31ac677b8e8fe89bf88d3749a.jpg"
                    alt="car!"></figure>
            <div class="card-body">
                <h2 class="card-title">钓鱼链接生成器</h2>
                <p>钓骗子专用，提供精准ip定位</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">免费试用</button>
                </div>
            </div>
        </div>



    </div>



</template>