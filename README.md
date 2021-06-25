# 单页面应用（SPA）项目上线后程序刷新一次浏览器，来使用新上线资源

### 步骤：
1.复制文件 create_build_str_json.js 到项目

2.新增文件：public/json/build_str.json，否则运行命令时会报如下错误：
```
[Error: ENOENT: no such file or directory, open '/Users/cag2050/Documents/WebstormProjects/spa_deploy_refresh/public/json/build_str.json'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/Users/cag2050/Documents/WebstormProjects/spa_deploy_refresh/public/json/build_str.json'
}
```
3.package.json 新增:
```
"build:prd": "node create_build_str_json.js && cross-env BUILD_ENV=production vue-cli-service build",
"build:pre": "node create_build_str_json.js && cross-env BUILD_ENV=preview vue-cli-service build",
"build:qa": "node create_build_str_json.js && cross-env BUILD_ENV=development vue-cli-service build",
```
4.src/main.js 新增：
```
router.beforeEach((to, from, next) => {
    // 解决浏览器缓存问题
    axios.get('/json/build_str.json?v=' + new Date().getTime().toString())
        .then(res => {
            let newBuildStr = res.data.build_str;
            let oldBuildStr = localStorage.getItem('build_str') || '';
            if (oldBuildStr !== newBuildStr) {
                console.log('auto refresh');
                localStorage.setItem('build_str', newBuildStr);
                location.reload();
            }
            // 跳转处理
            if (to.fullPath === '/login' || from.fullPath === '/login') {
                next();
            } else {
                next();
            }
        });
})
```
5.运行各个环境的 build 命令来打包，比如测试环境：`npm run build:qa`

资料 | 网址
--- | ---
相关说明 | https://segmentfault.com/a/1190000021853289

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
