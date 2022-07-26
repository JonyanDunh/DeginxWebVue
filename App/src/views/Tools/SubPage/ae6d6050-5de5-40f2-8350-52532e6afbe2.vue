<script>
import PubSub from 'pubsub-js'

export default {
    mounted() {
        PubSub.publish('ChangeButtonStauts', "Index");
        PubSub.publish('ChangeLeftMenu', [
            {
                ItemName: "主面板",
                ItemKey: 0
            },
            {
                ItemName: "清除cookie",
                ItemKey: 1
            },
            {
                ItemName: "联系开发人员",
                ItemKey: 2
            }]);
        PubSub.publish('ChangeLeftMenuItemStauts', 0);
    }


}

</script>
<template  >

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full p-2">
        <div class=" rounded-lg sm:col-span-2">


            <div class="flex flex-col h-full ">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4  ">

                    <div class="h-full flex flex-col 
                    items-center justify-center">


                        <div class="card w-full h-full max-w-lg bg-base-100 hidden shadow-xl rounded-lg ">

                            <div class="card-body">
                                <label class="label">
                                    <span class="label-text text-2xl">哔哩哔哩账号登录</span>
                                </label>
                                <label class="label">
                                    <span class="label-text">二维码登录</span>
                                </label>
                                <div class="flex flex-col 
                    items-center justify-center">
                                    <img style="height: 150px;width:150px ;"
                                        src="https://message.biliimg.com/bfs/im/d3c0c832c1d51183c85d64ca9767999f8108952a.png"
                                        alt="Shoes" />
                                </div>

                                <label class="label">
                                    <span class="label-text">Cookie登录</span>
                                </label>
                                <input type="text" placeholder="bili_jct"
                                    class="input input-bordered input-info w-full " />
                                <input type="text" placeholder="SESSDATA"
                                    class="input input-bordered input-info w-full " />
                                <div class="form-control">
                                    <label class="cursor-pointer label">
                                        <span class="label-text">保存Cookie到浏览器</span>
                                        <input type="checkbox" class="checkbox checkbox-accent" />
                                    </label>
                                    <label class="cursor-pointer label">
                                        <span class="label-text">同意本站服务条款、隐私政策</span>
                                        <input type="checkbox" class="checkbox checkbox-accent" />
                                    </label>
                                    <label class="cursor-pointer label">
                                        <span class="label-text">我已知晓本站不会存储任何登录数据，如发生账号泄露与本站无关</span>
                                        <input type="checkbox" class="checkbox checkbox-accent" />
                                    </label>
                                </div>
                                <button class="btn btn-primary">登录</button>
                                <div class="alert alert-success shadow-lg rounded-lg mt-2">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="stroke-current  flex-shrink-0 h-6 w-6" fill="none"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>二维码扫描成功！</span>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div class="card w-full h-full max-w-lg  bg-base-100   shadow-xl rounded-lg ">

                            <div class="card-body">


                                <div class="stat">
                                    <div class="stat-figure text-secondary">
                                        <div class="avatar">
                                            <div
                                                class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img
                                                    src="https://i1.hdslb.com/bfs/app/8920e6741fc2808cce5b81bc27abdbda291655d3.png@240w_240h_1c_1s.webp" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="stat-value">陈睿</div>
                                    <div class="stat-title">uid:208259</div>
                                    <div class="stat-desc text-secondary">喜欢的话就坚持吧</div>
                                </div>

                                <div class="stats stats-vertical shadow">

                                    <div class="stat">
                                        <div class="stat-title">粉丝数</div>
                                        <div class="stat-value text-primary">2402K</div>

                                    </div>

                                    <div class="stat">

                                        <div class="stat-title">关注数</div>
                                        <div class="stat-value text-secondary">478</div>

                                    </div>

                                    <div class="stat">
                                        <div class="stat-title">硬币数</div>
                                        <div class="stat-value text-error">500K</div>

                                    </div>
                                    <div class="stat">
                                        <div class="stat-title">稿件数</div>
                                        <div class="stat-value text-info">127</div>

                                    </div>
                                    <div class="stat">
                                        <div class="stat-title">主播等级</div>
                                        <div class="stat-value text-accent">20</div>

                                    </div>


                                </div>
                                <div class="card-actions justify-end">
                                    <button class="btn btn-primary">退出登录</button>
                                </div>
                            </div>


                        </div>

                    </div>

                    <div class="flex flex-col h-full">
                        <div class="h-full flex flex-col 
                    items-center ">

                            <div class="card rounded-lg card-compact  bg-base-100 shadow-xl">
                                <figure><img style="height:18rem ;width: 32rem;"
                                        src="https://message.biliimg.com/bfs/im/4fda7c6d436290ecd6eec7cb66ff16df50fbb93e.webp"
                                        alt="Shoes" /></figure>
                                <div class="card-body">

                                    <div class="form-control">
                                        <div class="input-group">
                                            <input type="text" placeholder="图片链接" class="input input-bordered w-full" />
                                            <button class="btn btn-secondary">
                                                读取网络图片
                                            </button>

                                        </div>

                                    </div>
                                    <div class="card-actions justify-end">
                                        <button class="btn btn-primary">读取本地图片</button>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div class="h-full flex flex-col 
                    items-center mt-4">

                            <div class="card w-full max-w-lg h-full bg-base-100 shadow-xl rounded-lg">

                                <div class="card-body justify-center">
                                    <label class="label">
                                        <span class="label-text text-2xl">直播间动态封面上传</span>
                                    </label>
                                    <div class="form-control">
                                        <label class="cursor-pointer label">
                                            <span class="label-text">花费2枚硬币</span>
                                            <input type="checkbox" class="checkbox checkbox-accent" />
                                        </label>
                                        <label class="cursor-pointer label">
                                            <span class="label-text">为up主视频、动态点赞</span>
                                            <input type="checkbox" class="checkbox checkbox-accent" />
                                        </label>
                                        <label class="cursor-pointer label">
                                            <span class="label-text">分享到动态</span>
                                            <input type="checkbox" class="checkbox checkbox-accent" />
                                        </label>
                                    </div>
                                    <div class="card-actions justify-end">
                                        <button class="btn btn-primary">上传封面</button>
                                    </div>


                                </div>

                            </div>

                        </div>
                    </div>
                </div>



                <div class="mockup-code h-full rounded-lg mt-4">
                    <pre data-prefix="1"><code>开始上传图片</code></pre>
                    <pre data-prefix="2"><code>installing...</code></pre>
                    <pre data-prefix="3"><code>Error!</code></pre>
                    <progress class="progress progress-error w-full absolute bottom-0"></progress>
                </div>

            </div>

        </div>

        <div class="bg-base-100 rounded-lg">
            <div class="hero rounded-lg min-h-full bg-base-100">
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="text-5xl font-bold">这里是文档</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>