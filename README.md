### 代码解析
```js
#!/usr/bin/env node   => 想要bin直接执行必须得指定环境（node）
const program = require('commander');
const packageJson = require('../package.json')
const { exec } = require('child_process');

// git仓库地址
const gitRepositoryPath = "http://124.70.134.70:8099/ruoyi-youya-nft/youya-ntf-h5.git"

// 创建文件夹
const createDir = (dir) => {
    return new Promise(resolve => {
        exec(`mkdir ${dir}`, {}, (error) => {
            resolve(process.cwd() + "\\"+dir)
            if (error) {
                console.error(`exec error: ${error}`);
            }
        })
    })
}

// 拉取代码
const gitClone = (cwd = process.cwd()) => {
    return new Promise(resolve => {
        exec(`git clone ${gitRepositoryPath}`, {
            cwd
        }, (error) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return ;
            }
        })
    })
}

// options选项只有Boolean值
program.version(packageJson.version)
.name('lwl-cli')
.description('Split a string into substrings and display as an array')
.argument('<dir>','目录名')
.option("-d",'--dir',"目录名")
.action((dir) => {
    if(dir){
        createDir(dir).then((cwd) => {
            gitClone(cwd)
        })
    }else {
        gitClone()
    }
})

//解析用户传入的命令
program.parse(process.argv);
```
### package.json解析
```js
{
  //注意name属性一定要独一无二如果重复则会发布失败
  "name": "luowl-cli",
  "version": "1.0.1",
  "description": "测试用的脚手架",
  // 如果是node脚本则需要配置bin
  "bin": {
    // 前面的k就是执行（cli.js）文件的命令用户（npm i）安装之后直接使用（lwl-cli）就可以执行（bin/cli.js）文件
    "lwl-cli": "bin/cli.js"
  },
  // import 导入的默认文件
  "main": "index.js",
  // 仓库地址
  "repository": {
    "type": "git",
    "url": "https://gitee.com/lwllbt/lwl-cli.git"
  },
  // npm publish 需要发布的文件
  "files": [
    "bin"
  ],
}
```
### npm 常用命令
1. npm link --force  （将当前项目在本地node_modules文件夹下面创建link）
2. npm adduser （注册账户）
3. npm whoami （查看当前登录的账户）
4. npm login （登录）
5. npm publish （发布项目）

### npm 地址管理插件 nrm
1. nrm ls （查看当前所有的地址）
2. nrm use --name （切换地址）