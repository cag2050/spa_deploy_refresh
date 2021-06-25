const path = require("path");
const fs = require("fs");

// 将当前时间戳写入json文件
let json_obj = { build_str: new Date().getTime().toString() };
fs.writeFile(
    path.resolve(__dirname, "./public/json/build_str.json"),
    JSON.stringify(json_obj),
    function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("打包字符串写入文件：public/json/build_str.json，成功！");
    }
);
