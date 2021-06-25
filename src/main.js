import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    // 解决浏览器缓存问题
    axios
        .get("/json/build_str.json?v=" + new Date().getTime().toString())
        .then((res) => {
            let newBuildStr = res.data.build_str;
            let oldBuildStr = localStorage.getItem("build_str") || "";
            if (oldBuildStr !== newBuildStr) {
                console.log("auto refresh");
                localStorage.setItem("build_str", newBuildStr);
                location.reload();
            }
            // 跳转处理
            if (to.fullPath === "/login" || from.fullPath === "/login") {
                next();
            } else {
                next();
            }
        });
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
