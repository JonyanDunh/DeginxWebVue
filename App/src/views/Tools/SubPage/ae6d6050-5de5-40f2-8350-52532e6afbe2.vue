<script>
import PubSub from 'pubsub-js'
import axios from 'axios';
import QrcodeVue from 'qrcode.vue'
import { onMounted, ref } from 'vue'
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;

var ApiSite = ""
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
function getQueryVariable(query, variable) {
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
export default {
    setup() {
        const ChooseFile = ref(null) //核心
        const CoverImgDiv = ref(null) //核心

        onMounted(() => {


        })

        return {
            ChooseFile,
            CoverImgDiv
        }
    },
    data() {
        return {
            QrcodeValue: '',
            ScanSucceed: false,
            ScanStatusMessage: "请使用哔哩哔哩客户端扫码登录",
            SESSDATA: "",
            bili_jct: "",
            AllowPolicy: false,
            AllowNonStore: false,
            isLogin2Bili: false,
            BiliName: "",
            BiliFans: null,
            BiliStars: null,
            BiliCoins: null,
            BiliWorks: null,
            BilLivelevel: null,
            BiliAvatar: "",
            BiliUID: null,
            BiliDescribe: "",
            BiliLiveRoomID: null,
            BiliLiveRoomCover: "",
            BiliDynamicCount: null,
            BiliVideoCount: null,
            MockupCodeContent: '',
            CoverImg: "https://message.biliimg.com/bfs/im/4fda7c6d436290ecd6eec7cb66ff16df50fbb93e.webp",
            CoverFileName: "",
            WebCoverImgBase64: "",
            CoverFile: null,
            UploadSuccess: false,
            DedeUserID: null,
            DedeUserID__ckMd5: null

        }
    },
    mounted() {
        if (this.$cookies.get("isLogin2Bili") == "true")
            this.submitBILIForm()
        PubSub.publish('ChangeButtonStauts', "Index");
        PubSub.publish('ChangeLeftMenu', [
            {
                ItemName: "主面板",
                ItemKey: 0
            },
            {
                ItemName: "UP主页",
                ItemKey: 1
            },
            {
                ItemName: "加入交流群",
                ItemKey: 2
            },
            {
                ItemName: "联系开发人员",
                ItemKey: 3
            }]);
        PubSub.publish('ChangeLeftMenuItemStauts', 0);
        if (this.$cookies.get("isLogin2Bili") == "false" || this.$cookies.get("isLogin2Bili") == null) {
            this.MockupCodeContent += ' <pre data-prefix="$"><code>正在从http://passport.bilibili.com/qrcode/getLoginUrl获取登录二维码</code></pre>'
            axios.get(ApiSite + '/proxy/bilibili/passport/qrcode/getLoginUrl')
                .then((res) => {

                    this.QrcodeValue = res.data.data.url
                    this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>登录二维码获取成功</code></pre>'
                    this.MockupCodeContent += ' <pre data-prefix="$"><code>正在从http://passport.bilibili.com/qrcode/getLoginInfo获取扫码状态...</code></pre>'
                    this.MockupCodeContent += ' <pre data-prefix="$"><code>请使用哔哩哔哩客户端扫码登录</code></pre>'
                    var ScanStatusMessageTimes = 0;

                    var CheckScanStatusID = setInterval(() => {

                        //clearInterval(CheckScanStatusID)
                        var data = new FormData()
                        data.append('oauthKey', res.data.data.oauthKey);
                        const paramsList = new URLSearchParams(data)
                        var config = {
                            method: 'post',
                            url: ApiSite + '/proxy/bilibili/passport/qrcode/getLoginInfo',
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
                                        if (ScanStatusMessageTimes == 0) {
                                            this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>扫码成功,请在手机登录</code></pre>'
                                            ScanStatusMessageTimes++
                                        }
                                        break;
                                }
                                if (res.data.status) {
                                    this.ScanSucceed = true
                                    this.ScanStatusMessage = "获取Cookie成功!请点击下方登录";
                                    this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>获取Cookie成功!请点击登录</code></pre>'
                                    clearInterval(CheckScanStatusID)
                                    var url = res.data.data.url
                                    this.SESSDATA = getQueryVariable(url, "SESSDATA")
                                    this.bili_jct = getQueryVariable(url, "bili_jct")

                                    this.DedeUserID__ckMd5 = getQueryVariable(url, "DedeUserID__ckMd5")
                                }
                            })
                            .catch((err) => {
                                this.ScanStatusMessage = err.response.data.message;
                                this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>登录状态获取失败!</code></pre>'
                                this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>失败信息如下：</code></pre>'
                                this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>' + err.response.data.data + '</code></pre>'
                                console.log(err.response.data) //错误信息
                            })

                    }, 1000)


                })
                .catch((err) => {
                    this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>登录二维码获取失败!</code></pre>'
                    this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>失败信息如下：</code></pre>'
                    this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>' + err.response.data.data + '</code></pre>'
                    console.log(err.response.data) //错误信息
                })
        }
    },
    methods: {
        Logout() {
            var data = new FormData()
            data.append('biliCSRF', this.$cookies.get("bili_jct"));
            this.MockupCodeContent += ' <pre  data-prefix="$"><code>正在调用http://passport.bilibili.com/login/exit/v2接口退出登录</code></pre>'
            const paramsList = new URLSearchParams(data)
            axios.post(ApiSite + '/proxy/bilibili/passport/login/exit/v2', paramsList, {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then((res) => {
                console.log(res.data)
                this.MockupCodeContent += ' <pre class="text-success"  data-prefix="$"><code>退出成功!如不放心,请再次用您的Cookie尝试登录以验证是否退出账号或改密码</code></pre>'
                this.MockupCodeContent += ' <pre   data-prefix="$"><code>您的Cookie如下:</code></pre>'
                this.MockupCodeContent += ' <pre   data-prefix="$"><code>bili_jct:' + this.$cookies.get("bili_jct") + '</code></pre>'
                this.MockupCodeContent += ' <pre   data-prefix="$"><code>SESSDATA(未uriencode):' + this.$cookies.get("SESSDATA") + '</code></pre>'
                this.MockupCodeContent += ' <pre   data-prefix="$"><code>SESSDATA(已uriencode):' + encodeURIComponent(this.$cookies.get("SESSDATA")) + '</code></pre>'
                this.MockupCodeContent += ' <pre   data-prefix="$"><code>DedeUserID:' + encodeURIComponent(this.$cookies.get("DedeUserID")) + '</code></pre>'
                this.MockupCodeContent += ' <pre   data-prefix="$"><code>DedeUserID__ckMd5:' + encodeURIComponent(this.$cookies.get("DedeUserID__ckMd5")) + '</code></pre>'
                this.$cookies.set("isLogin2Bili", false)
                this.$cookies.remove("SESSDATA")
                this.$cookies.remove("bili_jct")
                this.$cookies.remove("DedeUserID")
                this.$cookies.remove("DedeUserID__ckMd5")
                this.isLogin2Bili = false
            })
                .catch((err) => {
                    this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>上传动态封面失败!</code></pre>'
                    this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>失败信息如下：</code></pre>'
                    this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>' + err.response.data.message + '</code></pre>'
                    console.log(err.response.data) //错误信息
                })
        },
        submitBILIForm() {
            var SESSDATA
            var bili_jct
            if (this.SESSDATA != "" && this.bili_jct != "") {
                SESSDATA = this.SESSDATA
                bili_jct = this.bili_jct
                this.$cookies.set("SESSDATA", decodeURIComponent(SESSDATA))
                this.$cookies.set("bili_jct", bili_jct)
                this.$cookies.set("DedeUserID__ckMd5", this.DedeUserID__ckMd5)

            } else if (this.$cookies.get("isLogin2Bili") == "true") {
                SESSDATA = this.$cookies.get("SESSDATA")

                bili_jct = this.$cookies.get("bili_jct")
            }
            var data = new FormData()
            data.append('bucket', 'material_up');
            data.append('dir', '');
            data.append('file', base64ToFile("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAAnAAAAJwEqCZFPAAAADElEQVQImWNgYGAAAAAEAAGjChXjAAAAAElFTkSuQmCC", "test.png"));
            data.append('csrf', bili_jct);
            this.MockupCodeContent += ' <pre  data-prefix="$"><code>正在上传空白图片至https://member.bilibili.com/x/material/up/upload,以测试SESSDATA和bili_jct是否有效</code></pre>'
            axios.request({
                method: 'post',
                url: ApiSite + '/proxy/bilibili/member/x/material/up/upload',
                data: data
            })
                .then((res) => {
                    if (res.data.code == 0 || res.data.code == 20414) {
                        this.$cookies.set("isLogin2Bili", true)
                        this.isLogin2Bili = true
                        this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>登录成功!</code></pre>'
                        this.MockupCodeContent += ' <pre  data-prefix="$"><code>正在从https://api.bilibili.com/x/web-interface/nav获取用户名、UID、头像、硬币数</code></pre>'
                        axios.get(ApiSite + '/proxy/bilibili/api/x/web-interface/nav')
                            .then((res) => {
                                this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>获取成功!信息如下:</code></pre>'
                                this.MockupCodeContent += ' <pre  data-prefix="$"><code>username:' + res.data.data.uname + '</code></pre>'
                                this.MockupCodeContent += ' <pre  data-prefix="$"><code>uid:' + res.data.data.mid + '</code></pre>'
                                this.MockupCodeContent += ' <pre  data-prefix="$"><code>avatar:' + res.data.data.face + '</code></pre>'
                                this.MockupCodeContent += ' <pre  data-prefix="$"><code>coins:' + res.data.data.money + '</code></pre>'
                                this.BiliName = res.data.data.uname
                                this.BiliCoins = res.data.data.money
                                this.BiliUID = res.data.data.mid
                                this.BiliAvatar = res.data.data.face
                                this.$cookies.set("DedeUserID", res.data.data.mid)
                                this.MockupCodeContent += ' <pre  data-prefix="$"><code>正在从https://api.bilibili.com/x/space/acc/info?mid=' + this.BiliUID + '&jsonp=jsonp获取用户签名、直播房间号、直播间封面</code></pre>'
                                axios.get(ApiSite + '/proxy/bilibili/api/x/space/acc/info?mid=' + this.BiliUID + '&jsonp=jsonp')
                                    .then((res) => {
                                        this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>获取成功!信息如下:</code></pre>'
                                        this.MockupCodeContent += ' <pre  data-prefix="$"><code>sign:' + res.data.data.sign + '</code></pre>'
                                        this.MockupCodeContent += ' <pre  data-prefix="$"><code>live room id:' + res.data.data.live_room.roomid + '</code></pre>'
                                        this.MockupCodeContent += ' <pre  data-prefix="$"><code>live room cover:' + res.data.data.live_room.cover + '</code></pre>'
                                        this.BiliDescribe = res.data.data.sign
                                        this.BiliLiveRoomID = res.data.data.live_room.roomid
                                        this.BiliLiveRoomCover = res.data.data.live_room.cover
                                        this.CoverImg = res.data.data.live_room.cover

                                    })
                                    .catch((err) => {
                                        this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>获取用户签名、直播房间号、直播间封面失败!</code></pre>'
                                        this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>失败信息如下：</code></pre>'
                                        this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>' + err.response.data.data + '</code></pre>'
                                        console.log(err.response.data) //错误信息
                                    })
                                this.MockupCodeContent += ' <pre  data-prefix="$"><code>正在从https://api.bilibili.com/x/space/navnum?mid=' + this.BiliUID + '获取用户视频数</code></pre>'
                                axios.get(ApiSite + '/proxy/bilibili/api/x/space/navnum?mid=' + this.BiliUID)
                                    .then((res) => {
                                        this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>获取成功!信息如下:</code></pre>'
                                        this.MockupCodeContent += ' <pre  data-prefix="$"><code>video count:' + res.data.data.video + '</code></pre>'
                                        this.BiliVideoCount = res.data.data.video



                                    })
                                    .catch((err) => {
                                        this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>获取用户视频数失败!</code></pre>'
                                        this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>失败信息如下：</code></pre>'
                                        this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>' + err.response.data.data + '</code></pre>'
                                        console.log(err.response.data) //错误信息
                                    })

                            })
                            .catch((err) => {
                                this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>获取用户名、UID、头像、硬币数失败!</code></pre>'
                                this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>失败信息如下：</code></pre>'
                                this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>' + err.response.data.data + '</code></pre>'
                                console.log(err.response.data) //错误信息
                            })


                        this.MockupCodeContent += ' <pre  data-prefix="$"><code>正在从https://api.bilibili.com/x/web-interface/nav/stat获取用户粉丝数、关注数、动态数</code></pre>'
                        axios.get(ApiSite + '/proxy/bilibili/api/x/web-interface/nav/stat')
                            .then((res) => {
                                this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>获取成功!信息如下:</code></pre>'
                                this.MockupCodeContent += ' <pre  data-prefix="$"><code>fans:' + res.data.data.follower + '</code></pre>'
                                this.MockupCodeContent += ' <pre  data-prefix="$"><code>stars:' + res.data.data.following + '</code></pre>'
                                this.MockupCodeContent += ' <pre  data-prefix="$"><code>dynamics:' + res.data.data.dynamic_count + '</code></pre>'
                                this.BiliFans = res.data.data.follower
                                this.BiliStars = res.data.data.following
                                this.BiliDynamicCount = res.data.data.dynamic_count
                            })
                            .catch((err) => {
                                this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>获取用户粉丝数、关注数、动态数失败!</code></pre>'
                                this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>失败信息如下：</code></pre>'
                                this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>' + err.response.data.data + '</code></pre>'
                                console.log(err.response.data) //错误信息
                            })
                        this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>获取所有信息成功!</code></pre>'
                        console.log("登录成功")
                    } else if (res.data.code == -101) {
                        this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>SESSDATA填写有误或已过期</code></pre>'
                        this.$cookies.set("isLogin2Bili", false)
                        this.$cookies.remove("SESSDATA")
                        this.$cookies.remove("bili_jct")
                    } else if (res.data.code == -111) {
                        this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>bili_jct填写有误或已过期</code></pre>'
                        this.$cookies.set("isLogin2Bili", false)
                        this.$cookies.remove("SESSDATA")
                        this.$cookies.remove("bili_jct")
                    }
                })
                .catch((err) => {
                    this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>检验SESSDATA和bili_jct失败!</code></pre>'
                    this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>失败信息如下：</code></pre>'
                    this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>' + err.response.data.data + '</code></pre>'
                    console.log(err.response.data) //错误信息
                })

        },
        uploadLocalCover() {
            this.ChooseFile.click()


        },
        LoadBase64CoverImg() {
            if (this.WebCoverImgBase64 != "") {
                this.CoverImg = this.WebCoverImgBase64
                this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>读取图片BASE64成功:' + this.WebCoverImgBase64 + '</code></pre>'
                this.CoverFile = base64ToFile(this.WebCoverImgBase64, "image")

            }


        },
        uploadCover() {
            var bili_jct = this.$cookies.get("bili_jct")
            var data = new FormData()
            data.append('bucket', 'material_up');
            data.append('dir', '');
            data.append('file', this.CoverFile);
            data.append('csrf', bili_jct);
            this.MockupCodeContent += ' <pre  data-prefix="$"><code>正在上传封面至b站图床https://member.bilibili.com/x/material/up/upload</code></pre>'
            axios.request({
                method: 'post',
                url: ApiSite + '/proxy/bilibili/member/x/material/up/upload',
                data: data
            })
                .then((res) => {
                    this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>上传图片到b站图床成功!:' + res.data.data.location + '</code></pre>'
                    data = new FormData()
                    data.append('csrf', bili_jct);
                    data.append('cover', res.data.data.location);
                    data.append('SESSDATA', this.$cookies.get("SESSDATA"));
                    this.MockupCodeContent += ' <pre  data-prefix="$"><code>正在上传封面至哔哩哔哩直播间</code></pre>'
                    const paramsList = new URLSearchParams(data)
                    axios.post(ApiSite + '/api/tools/VideoWebSite/bilibili/uploadLiveDynamicCover', paramsList, {
                        headers: { 'content-type': 'application/x-www-form-urlencoded' }
                    }).then((res) => {
                        console.log(res.data)
                        this.MockupCodeContent += ' <pre class="text-success"  data-prefix="$"><code>上传动态封面成功!正在审核中,请进入直播间管理页面https://link.bilibili.com/p/center/index#/my-room/start-live查看</code></pre>'
                        this.UploadSuccess = true
                    })
                        .catch((err) => {
                            this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>上传动态封面失败!</code></pre>'
                            this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>失败信息如下：</code></pre>'
                            this.MockupCodeContent += ' <pre class="bg-error text-error-content" data-prefix="$"><code>' + err.response.data.data + '</code></pre>'
                            console.log(err.response.data) //错误信息
                        })

                })
                .catch((err) => {
                    console.log(err.response.data)
                })

        },

        LoadFile() {
            if (this.ChooseFile.files[0] != null) {
                this.CoverFileName = this.ChooseFile.files[0].name
                var file = this.ChooseFile.files[0]
                this.CoverFile = this.ChooseFile.files[0]
                var reader = new FileReader();
                if (file) {
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        var base64 = reader.result;
                        this.CoverImg = base64
                        this.MockupCodeContent += ' <pre class="text-success" data-prefix="$"><code>读取本地图片成功:' + this.ChooseFile.files[0].name + '</code></pre>'
                    }
                }

            }


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


            <div style="overflow:scroll" class="flex flex-col h-full ">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4  ">

                    <div class="h-full flex flex-col 
                    items-center justify-center">


                        <div v-if="!isLogin2Bili"
                            class="card w-full h-full max-w-lg bg-base-100  shadow-xl rounded-lg ">

                            <div class="card-body">
                                <label class="label">
                                    <span class="label-text text-2xl">哔哩哔哩账号登录</span>
                                </label>
                                <label class="label">
                                    <span class="label-text">二维码登录获取Cookie</span>
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
                                        <span class="label-text">手动输入Cookie</span>
                                    </label>
                                    <input type="password" name="bili_jct" id="bili_jct" v-model="bili_jct"
                                        placeholder="bili_jct" class="input input-bordered input-info w-full mb-4" />
                                    <input type="password" name="SESSDATA" id="SESSDATA" v-model="SESSDATA"
                                        placeholder="SESSDATA" class="input input-bordered input-info w-full mb-4" />
                                    <div class="form-control">
                                        <label class="cursor-pointer label">
                                            <span class="label-text">同意本站服务条款、隐私政策</span>
                                            <input v-model="AllowPolicy" type="checkbox"
                                                class="checkbox checkbox-accent" />
                                        </label>
                                        <label class="cursor-pointer label">
                                            <span class="label-text">我已知晓本站不会存储任何登录数据，如发生账号泄露与本站无关</span>
                                            <input v-model="AllowNonStore" type="checkbox"
                                                class="checkbox checkbox-accent" />
                                        </label>
                                    </div>
                                    <div class="form-control mt-6">
                                        <button :disabled="!AllowNonStore || !AllowPolicy"
                                            class="btn btn-primary mb-4">登录</button>
                                    </div>
                                    <div v-if="!AllowPolicy" class="alert alert-warning shadow-lg mb-4">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <span>请同意本站服务条款、隐私政策</span>
                                        </div>
                                    </div>
                                    <div v-if="!AllowNonStore" class="alert alert-warning shadow-lg">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <span>请确认已知晓本站不会存储任何登录数据，如发生账号泄露与本站无关</span>
                                        </div>
                                    </div>
                                </form>


                            </div>


                        </div>

                        <div v-if="isLogin2Bili"
                            class="card w-full h-full max-w-lg  bg-base-100  shadow-xl rounded-lg ">

                            <div class="card-body">


                                <div class="stat">
                                    <div class="stat-figure text-secondary">
                                        <div class="avatar">
                                            <div
                                                class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img :src="BiliAvatar" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="stat-value">{{ BiliName }}</div>
                                    <div class="stat-title">uid:{{ BiliUID }}</div>
                                    <p style="overflow:scroll" class="stat-desc text-secondary ">{{ BiliDescribe }}</p>
                                </div>

                                <div class="stats stats-vertical shadow">

                                    <div class="stat">
                                        <div class="stat-title">粉丝数</div>
                                        <div class="stat-value text-primary">{{ BiliFans }}</div>

                                    </div>

                                    <div class="stat">

                                        <div class="stat-title">关注数</div>
                                        <div class="stat-value text-secondary">{{ BiliStars }}</div>

                                    </div>

                                    <div class="stat">
                                        <div class="stat-title">硬币数</div>
                                        <div class="stat-value text-error">{{ BiliCoins }}</div>

                                    </div>
                                    <div class="stat">
                                        <div class="stat-title">视频数</div>
                                        <div class="stat-value text-info">{{ BiliVideoCount }}</div>

                                    </div>
                                    <div class="stat">
                                        <div class="stat-title">动态数</div>
                                        <div class="stat-value text-accent">{{ BiliDynamicCount }}</div>

                                    </div>


                                </div>
                                <div class="card-actions justify-end">
                                    <button @click="Logout" class="btn btn-primary">退出登录</button>
                                    <div class="alert alert-warning shadow-lg">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <span>对于二维码的登录,可以完全退出登录。对于手动输入Cookie的登录,只能清除本页面保存的Cookie,而无法根本退出账号!请从b站页面退出登录！</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>

                    <div class="flex  flex-col h-full">
                        <div class="h-full flex flex-col 
                    items-center ">

                            <div class="card rounded-lg card-compact  bg-base-100 shadow-xl">
                                <figure>
                                    <img style="height:18rem ;width: 32rem;" :src="CoverImg" />
                                </figure>
                                <div class="card-body">

                                    <div class="form-control">
                                        <div class="input-group">
                                            <input type="text" v-model="WebCoverImgBase64" placeholder="图片BASE64"
                                                class="input input-bordered w-full" />
                                            <button @click="LoadBase64CoverImg" class="btn btn-secondary">
                                                读取BASE64图片
                                            </button>

                                        </div>

                                    </div>
                                    <div class="card-actions justify-end">


                                        <div class="input-group">
                                            <input type="text" v-model="CoverFileName" disabled
                                                class="input input-bordered w-full" />
                                            <input type="file" accept="image/webp,image/png" @change="LoadFile"
                                                ref="ChooseFile" class="hidden" />
                                            <button @click="uploadLocalCover" class="btn btn-primary">读取本地图片</button>

                                        </div>
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
                                            <span class="label-text">为up主5个视频点赞</span>
                                            <input checked="checked" disabled type="checkbox"
                                                class="checkbox checkbox-accent" />
                                        </label>
                                        <label class="cursor-pointer label">
                                            <span class="label-text">为up主5个视频投币（花费10枚硬币）</span>
                                            <input checked="checked" disabled type="checkbox"
                                                class="checkbox checkbox-accent" />
                                        </label>
                                        <label class="cursor-pointer label">
                                            <span class="label-text">收藏up主5个视频</span>
                                            <input checked="checked" disabled type="checkbox"
                                                class="checkbox checkbox-accent" />
                                        </label>
                                        <label class="cursor-pointer label">
                                            <span class="label-text">关注UP主</span>
                                            <input checked="checked" disabled type="checkbox"
                                                class="checkbox checkbox-accent" />
                                        </label>
                                    </div>
                                    <div class="card-actions justify-end">
                                        <button :disabled="!isLogin2Bili" @click="uploadCover"
                                            class="btn btn-primary">上传封面</button>
                                        <div :hidden="!UploadSuccess" class="alert alert-success shadow-lg">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>上传动态封面成功!</span>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>

                        </div>
                    </div>
                </div>



                <div class="mockup-code max-h-64 sm:max-h-full h-full rounded-lg mt-4 " style="overflow:scroll">
                    <div v-html="MockupCodeContent"></div>
                    <progress class="progress progress-error w-full absolute bottom-0"></progress>
                </div>

            </div>

        </div>

        <div class="bg-base-100 rounded-lg h-full">
            <div class="hero rounded-lg min-h-full bg-base-100">
                <iframe class="rounded-lg" loading="lazy" src="https://d2oa7ib7pm9cc3.cloudfront.net/" width="100%"
                    height="100%"></iframe>
            </div>
        </div>
    </div>

</template>