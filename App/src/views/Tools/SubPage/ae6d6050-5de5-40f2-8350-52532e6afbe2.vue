<script>
import PubSub from 'pubsub-js'
import axios from 'axios';
import QrcodeVue from 'qrcode.vue'


axios.defaults.withCredentials = true;

function base64ToFile(base64, fileName) {
    let arr = base64.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bytes = atob(arr[1]);
    let n = bytes.length;
    let ia = new Uint8Array(n);
    while (n--) {
        ia[n] = bytes.charCodeAt(n);
    }
    return new File([ia], fileName, { type: mime });  // 将值抛出去
}
function getQueryVariable(query,variable)
{
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
export default {
    data() {
        return {
            QrcodeValue: '',
            ScanSucceed: false,
            ScanStatusMessage: "请使用哔哩哔哩客户端扫码登录"
        }
    },
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

        axios.get('/proxy/bilibili/passport/qrcode/getLoginUrl')
            .then((res) => {

                this.QrcodeValue = res.data.data.url

                /*var CheckScanStatusID = setInterval(() => {

                    var data = new FormData()
                    data.append('oauthKey', res.data.data.oauthKey);
                    const paramsList = new URLSearchParams(data)
                    var config = {
                        method: 'post',
                        url: '/proxy/bilibili/passport/qrcode/getLoginInfo',
                        data: paramsList,
                        headers: { 'content-type': 'application/x-www-form-urlencoded' }
                    };

                    axios.request(config)
                        .then((res) => {
                            switch (res.data.data) {
                                case -4:
                                    this.ScanStatusMessage = "请使用哔哩哔哩客户端扫码登录";
                                    break;
                                case -5:
                                    this.ScanStatusMessage = "扫码成功,请在手机登录";
                                    break;
                            }
                            if (res.data.status) {
                                this.ScanSucceed=true
                                this.ScanStatusMessage = "登录成功！";
                                clearInterval(CheckScanStatusID)
                                
                            }
                        })
                        .catch((err) => {
                            this.ScanStatusMessage = err.response.data.message;
                            console.log(err.response.data) //错误信息
                        })

                }, 10000)*/
                var url="https://passport.biligame.com/crossDomain?DedeUserID=96876893&DedeUserID__ckMd5=71a985607f613ccb&Expires=15551000&SESSDATA=e9de22fb%2C1674469400%2C4c9e6%2A71&bili_jct=2155122a31a5e4c176e877c5214dd24e&gourl=http%3A%2F%2Fwww.bilibili.com"
                var SESSDATA=getQueryVariable(url,"SESSDATA")
                var bili_jct=getQueryVariable(url,"bili_jct")
                console.log(SESSDATA)
                console.log(bili_jct)
            })
            .catch((err) => {

            })
    },
    methods: {
        submitBILIForm() {


            var SESSDATA = new FormData(document.getElementById("BILIloginForm")).get("SESSDATA")
            var bili_jct = new FormData(document.getElementById("BILIloginForm")).get("bili_jct")
            SESSDATA = '8742238d%2C1674213185%2Cd3332*71'
            bili_jct = '98b58494bc79a89ce81d5373382f52e5'
            this.$cookies.set("SESSDATA", decodeURIComponent(SESSDATA))
            var data = new FormData()
            data.append('bucket', 'material_up');
            data.append('dir', '');
            data.append('file', base64ToFile("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAAnAAAAJwEqCZFPAAAADElEQVQImWNgYGAAAAAEAAGjChXjAAAAAElFTkSuQmCC", "test.png"));
            data.append('csrf', bili_jct);
            var config = {
                method: 'post',
                url: '/proxy/bilibili/member/x/material/up/upload',
                data: data
            };

            axios.request(config)
                .then((res) => {
                    if (res.data.code == 0 || res.data.code == 20414) {

                        console.log("登录成功")
                    }
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err.response.data) //错误信息
                })
        }
    },
    components: {
        QrcodeVue,
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


                        <div class="card w-full h-full max-w-lg bg-base-100  shadow-xl rounded-lg ">

                            <div class="card-body">
                                <label class="label">
                                    <span class="label-text text-2xl">哔哩哔哩账号登录</span>
                                </label>
                                <label class="label">
                                    <span class="label-text">二维码登录</span>
                                </label>
                                <div class="flex flex-col items-center justify-center">
                                    <qrcode-vue :value="QrcodeValue" size="150" level="H"></qrcode-vue>
                                </div>
                                <div v-if="!ScanSucceed" class="alert alert-info shadow-lg">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            class="stroke-current flex-shrink-0 w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>{{ ScanStatusMessage }}</span>
                                    </div>
                                </div>
                                <div v-if="ScanSucceed" class="alert alert-success shadow-lg">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{{ ScanStatusMessage }}</span>
                                    </div>
                                </div>
                                <form id="BILIloginForm" @submit.prevent="submitBILIForm">
                                    <label class="label">
                                        <span class="label-text">Cookie登录</span>
                                    </label>
                                    <input type="password" name="bili_jct" id="bili_jct" v-model="bili_jct"
                                        placeholder="bili_jct" class="input input-bordered input-info w-full " />
                                    <input type="password" name="SESSDATA" id="SESSDATA" v-model="SESSDATA"
                                        placeholder="SESSDATA" class="input input-bordered input-info w-full " />
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
                                    <div class="form-control mt-6">
                                        <button class="btn btn-primary ">登录</button>
                                    </div>
                                </form>


                            </div>


                        </div>

                        <div class="card w-full h-full max-w-lg  bg-base-100  hidden shadow-xl rounded-lg ">

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